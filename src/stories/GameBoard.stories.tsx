import { Meta, StoryObj } from '@storybook/react';
import { GameBoard } from "../components/GameBoard/GameBoard";

const meta: Meta<typeof GameBoard> = {
    title: 'Components/GameBoard',
    component: GameBoard,
};

export default meta;
type Story = StoryObj<typeof GameBoard>;

const mockGameState = {
    points: { player1: 2, player2: 2 },
    field: [
        ['-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '*', '*', '-', '-', '-'],
        ['-', '-', '*', 'player1', 'player2', '*', '-', '-'],
        ['-', '-', '*', 'player2', 'player1', '*', '-', '-'],
        ['-', '-', '-', '*', '*', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-', '-'],
    ],
    currentPlayerName: 'player1',
    gameEnded: false,
};

export const Default: Story = {
    args: {
        gameState: mockGameState,
        onMove: (x: number, y: number) => console.log(`Move: ${x}, ${y}`),
        currentUser: 'player1',
    },
};

export const Loading: Story = {
    args: {
        gameState: null,
        onMove: () => {},
        currentUser: undefined,
    },
};

export const SecondPlayerTurn: Story = {
    args: {
        gameState: {
            ...mockGameState,
            currentPlayerName: 'player2',
        },
        onMove: (x: number, y: number) => console.log(`Move: ${x}, ${y}`),
        currentUser: 'player2',
    },
};