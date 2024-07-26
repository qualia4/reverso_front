import { Meta, StoryObj } from '@storybook/react';
import { ChatSection } from "../components/ChatSection/ChatSection";

const meta: Meta<typeof ChatSection> = {
    title: 'Components/ChatSection',
    component: ChatSection,
};

export default meta;
type Story = StoryObj<typeof ChatSection>;

const mockGameState = {
    points: { player1: 2, player2: 2 },
    field: [
        ['-', '-', '-', '-'],
        ['-', 'player1', 'player2', '-'],
        ['-', 'player2', 'player1', '-'],
        ['-', '-', '-', '-'],
    ],
    currentPlayerName: 'player1',
    gameEnded: false,
};

const mockChat = [
    { username: 'player1', text: 'Hello!', time: '10:00' },
    { username: 'player2', text: 'Hi there!', time: '10:01' },
    { username: 'player1', text: 'Good luck!', time: '10:02' },
];

export const Default: Story = {
    args: {
        chat: mockChat,
        message: '',
        setMessage: () => {},
        onSendMessage: () => {},
        gameState: mockGameState,
    },
};

export const EmptyChat: Story = {
    args: {
        chat: [],
        message: '',
        setMessage: () => {},
        onSendMessage: () => {},
        gameState: mockGameState,
    },
};

export const LongChat: Story = {
    args: {
        chat: Array(20).fill(null).map((_, index) => ({
            username: index % 2 === 0 ? 'player1' : 'player2',
            text: `Message ${index + 1}`,
            time: `10:${index.toString().padStart(2, '0')}`,
        })),
        message: '',
        setMessage: () => {},
        onSendMessage: () => {},
        gameState: mockGameState,
    },
};

export const WithTypedMessage: Story = {
    args: {
        chat: mockChat,
        message: 'Hello, this is a typed message',
        setMessage: () => {},
        onSendMessage: () => {},
        gameState: mockGameState,
    },
};

export const NoGameState: Story = {
    args: {
        chat: mockChat,
        message: '',
        setMessage: () => {},
        onSendMessage: () => {},
        gameState: null,
    },
};