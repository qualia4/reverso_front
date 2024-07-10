import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Modal} from "../components/Modal/Modal";

const meta: Meta<typeof Modal> = {
    title: 'Components/Modal',
    component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Open: Story = {
    args: {
        isOpen: true,
        onClose: () => console.log('Modal closed'),
        children: <div>Modal content goes here</div>,
    },
};

export const Closed: Story = {
    args: {
        isOpen: false,
        onClose: () => console.log('Modal closed'),
        children: <div>Modal content goes here</div>,
    },
};