import { Meta, StoryObj } from '@storybook/react';
import { GameStats } from "../components/GameStats/GameStats";

const meta: Meta<typeof GameStats> = {
    title: 'Components/GameStats',
    component: GameStats,
};

export default meta;
type Story = StoryObj<typeof GameStats>;

const baseGameState = {
    field: [
        ['player1', 'player2', 'player2'],
        ['player1', 'player1', 'player2'],
        ['player1', 'player2', 'player2'],
    ],
    gameEnded: false,
};

export const EqualScore: Story = {
    args: {
        gameState: {
            ...baseGameState,
            points: { player1: 3, player2: 3 },
            currentPlayerName: 'player1',
        },
        currentUser: 'player1',
    },
};

export const LargeScore: Story = {
    args: {
        gameState: {
            ...baseGameState,
            points: { player1: 32, player2: 31 },
            currentPlayerName: 'player2',
        },
        currentUser: 'player2',
    },
};

export const CurrentUserTurn: Story = {
    args: {
        gameState: {
            ...baseGameState,
            points: { player1: 3, player2: 2 },
            currentPlayerName: 'player1',
        },
        currentUser: 'player1',
    },
};

export const NotCurrentUserTurn: Story = {
    args: {
        gameState: {
            ...baseGameState,
            points: { player1: 5, player2: 4 },
            currentPlayerName: 'player2',
        },
        currentUser: 'player1',
    },
};