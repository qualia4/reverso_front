import React, { useEffect, useState } from "react";
import { useMyContext } from "../../MyContext";
import { useNavigate } from "react-router-dom";
import { getGameInfo } from "../../api/getGameInfo";
import { makeMoveService } from "../../api/makeMoveService";
import { getChatService } from "../../api/getChatService";
import { writeMessageService } from "../../api/writeMessageService";
import GameBoard from "../../components/GameBoard/GameBoard";
import GameStats from "../../components/GameStats/GameStats";
import ChatSection from "../../components/ChatSection/ChatSection";
import GameModal from "../../components/GameModal/GameModal";
import "./GamePage.css";
//test commit
interface ChatMessage {
  username: string;
  text: string;
  time: string;
}

interface GameState {
  points: Record<string, number>;
  field: string[][];
  currentPlayerName: string;
  gameEnded: boolean;
}

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { jsonData } = useMyContext();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        const data = await getGameInfo(jsonData.lobbyIDJSON);
        setGameState(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch game info.");
      }
    };

    const fetchChat = async () => {
      try {
        const chatData = await getChatService(jsonData.lobbyIDJSON);
        setChat(chatData);
      } catch (err) {
        console.error("Failed to fetch chat.", err);
      }
    };

    if (!jsonData?.lobbyIDJSON || !jsonData?.usernameJSON) {
      navigate("/profile");
      return;
    }

    fetchGameInfo();
    fetchChat();
    const id = setInterval(() => {
      fetchGameInfo();
      fetchChat();
    }, 500);
    setIntervalId(id);

    // Cleanup function to clear the interval when components unmounts
    return () => {
      clearInterval(id);
    };
  }, [jsonData, navigate]);

  const handleMove = async (x: number, y: number) => {
    if (
      !jsonData?.usernameJSON ||
      gameState?.currentPlayerName !== jsonData.usernameJSON
    )
      return;
    try {
      await makeMoveService(jsonData.usernameJSON, y, x);
      setGameState(await getGameInfo(jsonData.lobbyIDJSON)); // Refetch immediately after making a move
    } catch (err) {
      console.error(err);
      setError("Failed to make move.");
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      try {
        await writeMessageService(
          jsonData.lobbyIDJSON,
          jsonData.usernameJSON,
          message,
        );
        setMessage(""); // Clear message input after sending
        const chatData = await getChatService(jsonData.lobbyIDJSON);
        setChat(chatData);
      } catch (err) {
        console.error("Failed to send message.", err);
      }
    }
  };

  return (
      <div className="game-container" data-testid="game-page">
        <GameStats gameState={gameState} currentUser={jsonData?.usernameJSON}/>
        <GameModal gameState={gameState} username={jsonData?.usernameJSON} onClose={() => navigate("/profile")} />
        {error && <p className="error">{error}</p>}
        <GameBoard
            gameState={gameState}
            onMove={handleMove}
            currentUser={jsonData?.usernameJSON}
        />
        <ChatSection
            chat={chat}
            message={message}
            setMessage={setMessage}
            onSendMessage={handleSendMessage}
            gameState={gameState}
        />
      </div>
  );
};

export default GamePage;
