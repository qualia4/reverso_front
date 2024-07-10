// src/components/ErrorMessage/ErrorMessage.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage} from "../components/ErrorMessage/ErrorMessage";

const meta: Meta<typeof ErrorMessage> = {
    title: 'Components/ErrorMessage',
    component: ErrorMessage,
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
    args: {
        message: 'This is an error message',
    },
};