import React from 'react';
import "./ChatSection.css"

interface GameState {
    points: Record<string, number>;
    field: string[][];
    currentPlayerName: string;
    gameEnded: boolean;
}

interface ChatMessage {
    username: string;
    text: string;
    time: string;
}

interface ChatSectionProps {
    chat: ChatMessage[];
    message: string;
    setMessage: (message: string) => void;
    onSendMessage: () => void;
    gameState: GameState | null;
}

export const ChatSection: React.FC<ChatSectionProps> = ({ chat, message, setMessage, onSendMessage, gameState }) => {
    return (
        <div className="chat-section">
            <h3 className="chat-title">Chat</h3>
            <div className="chat-controls">
                <input
                    className="chat-input"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button className="chat-button" onClick={onSendMessage}>
                    Send
                </button>
            </div>
            <div className="chat-messages">
                {chat
                    .slice()
                    .reverse()
                    .map((msg, index) => (
                        <p key={index}>
              <span
                  style={{
                      backgroundColor:
                          gameState &&
                          Object.keys(gameState.points || {})[0] === msg.username
                              ? "#3498db"
                              : "#e74c3c",
                      color: "white",
                      padding: "2px 4px",
                      borderRadius: "4px",
                      fontWeight: "normal",
                  }}
              >
                {msg.username}
              </span>{" "}
                            [{msg.time}]: {msg.text}
                        </p>
                    ))}
            </div>
        </div>
    );
};

export default ChatSection;