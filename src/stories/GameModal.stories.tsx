import { Meta, StoryObj } from '@storybook/react';
import { GameModal } from "../components/GameModal/GameModal";

const meta: Meta<typeof GameModal> = {
    title: 'Components/GameModal',
    component: GameModal,
};

export default meta;
type Story = StoryObj<typeof GameModal>;

const baseGameState = {
    field: [
        ['player1', 'player2', 'player2'],
        ['player1', 'player1', 'player2'],
        ['player1', 'player2', 'player2'],
    ],
    currentPlayerName: 'player1',
    gameEnded: true,
};

export const TieGame: Story = {
    args: {
        gameState: {
            ...baseGameState,
            points: { player1: 4, player2: 4 },
        },
        username: 'player1',
        onClose: () => console.log('Modal closed'),
    },
};

export const UserIsWinner: Story = {
    args: {
        gameState: {
            ...baseGameState,
            points: { player1: 6, player2: 3 },
        },
        username: 'player1',
        onClose: () => console.log('Modal closed'),
    },
};

export const UserIsLoser: Story = {
    args: {
        gameState: {
            ...baseGameState,
            points: { player1: 3, player2: 6 },
        },
        username: 'player1',
        onClose: () => console.log('Modal closed'),
    },
};