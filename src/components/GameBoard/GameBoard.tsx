import React from 'react';
import "./GameBoard.css"

interface GameState {
    points: Record<string, number>;
    field: string[][];
    currentPlayerName: string;
    gameEnded: boolean;
}

interface GameBoardProps {
    gameState: GameState | null;
    onMove: (x: number, y: number) => void;
    currentUser: string | undefined;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, onMove, currentUser }) => {
    const renderCell = (cell: string, x: number, y: number) => {
        const playerKeys = gameState && Object.keys(gameState.points);
        const firstPlayer = playerKeys && playerKeys[0];

        let cellClass = "game-cell";
        if (cell === "*") {
            if (gameState?.currentPlayerName === currentUser) {
                cellClass += " game-cell-playable";
                if (gameState?.currentPlayerName === firstPlayer) {
                    cellClass += " first-player-border";
                } else {
                    cellClass += " second-player-border";
                }
            }
        } else if (cell !== "-" && cell !== "*") {
            cellClass +=
                cell === firstPlayer
                    ? " game-cell-first-player"
                    : " game-cell-second-player";
        }

        return (
            <button
                key={`${x}-${y}`}
                className={cellClass}
                onClick={() => cell === "*" && onMove(x, y)}
                data-testid={`cell-${y}-${x}`}
            >
                {" "}
            </button>
        );
    };

    if (!gameState) {
        return <div>Loading...</div>;
    }

    return (
        <div className="game-board">
            {gameState.field.map((row: string[], y: number) => (
                <div key={y} style={{ display: "flex" }}>
                    {row.map((cell, x) => renderCell(cell, x, y))}
                </div>
            ))}
        </div>
    );
};

export default GameBoard;