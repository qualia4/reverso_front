import React from 'react';

interface GameState {
    points: Record<string, number>;
    field: string[][];
    currentPlayerName: string;
    gameEnded: boolean;
}

interface GameStatsProps {
    gameState: GameState | null;
    currentUser: string | undefined;
}

const GameStats: React.FC<GameStatsProps> = ({ gameState, currentUser }) => {
    return (
        <div className="game-stats">
            <h3>Score:</h3>
            <div className="score-container">
                {gameState &&
                    Object.keys(gameState.points || {}).map((player, index) => (
                        <p
                            key={player}
                            className="score-box"
                            style={{
                                backgroundColor: index === 0 ? "#3498db" : "#e74c3c",
                            }}
                        >
                            {gameState.points[player]}
                        </p>
                    ))}
            </div>
            {gameState && (
                <p
                    style={{
                        color: "white",
                        padding: "5px",
                        borderRadius: "5px",
                        backgroundColor:
                            Object.keys(gameState.points || {})[0] === gameState.currentPlayerName
                                ? "#3498db"
                                : "#e74c3c",
                    }}
                >
                    {gameState.currentPlayerName === currentUser
                        ? "Your turn"
                        : `${gameState.currentPlayerName}'s turn`}
                </p>
            )}
        </div>
    );
};

export default GameStats;