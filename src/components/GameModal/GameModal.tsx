import React from 'react';
import "./GameModal.css"

interface GameState {
    points: Record<string, number>;
    field: string[][];
    currentPlayerName: string;
    gameEnded: boolean;
}

interface GameModalProps {
    gameState: GameState | null;
    username: string | undefined;
    onClose: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({ gameState, username, onClose }) => {
    if (!gameState || !gameState.gameEnded) return null;

    const points = gameState.points;
    const scores = Object.values(points);
    const isTie = scores.every(score => score === scores[0]);

    let winner: string | null = null;
    let headerText: string;
    let headerColor: string;

    if (isTie) {
        headerText = "It's a tie!";
        headerColor = "#f39c12"; // A yellow color for ties
    } else {
        winner = Object.keys(points).reduce((a, b) =>
            points[a] > points[b] ? a : b
        );
        headerText = winner === username ? "You won!" : `${winner} won!`;
        headerColor = Object.keys(gameState.points)[0] === winner ? "#3498db" : "#e74c3c";
    }

    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2
                    className="modal-header"
                    style={{ backgroundColor: headerColor }}
                >
                    {headerText}
                </h2>
                <h3>Score:</h3>
                <p style={{ fontWeight: "bold" }}>
                    {Object.entries(points)
                        .map(([player, score]) => `${player}: ${score}`)
                        .join(" ")}
                </p>
                <button className="game-button" onClick={onClose}>
                    Go to Profile
                </button>
            </div>
        </div>
    );
};

export default GameModal;