// src/components/Button/Button.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { LoginButton } from "../components/LoginButton/LoginButton";

const meta: Meta<typeof LoginButton> = {
    title: 'Components/LoginButton',
    component: LoginButton,
};

export default meta;
type Story = StoryObj<typeof LoginButton>;

export const Primary: Story = {
    args: {
        children: 'Click me',
        onClick: () => alert('Button clicked'),
    },
};

export const Disabled: Story = {
    args: {
        children: 'Disabled',
        onClick: () => {},
        disabled: true,
    },
};