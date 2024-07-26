import React from 'react';

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

const GameModal: React.FC<GameModalProps> = ({ gameState, username, onClose }) => {
    if (!gameState || !gameState.gameEnded) return null;

    const points = gameState.points;
    const winner = Object.keys(points).reduce((a, b) =>
        points[a] > points[b] ? a : b
    );

    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2
                    className="modal-header"
                    style={{
                        backgroundColor:
                            gameState && Object.keys(gameState.points || {})[0] === winner
                                ? "#3498db"
                                : "#e74c3c",
                    }}
                >
                    {winner === username ? "You won!" : `${winner} won!`}
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