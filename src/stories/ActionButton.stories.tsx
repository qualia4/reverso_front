import { Meta, StoryObj } from '@storybook/react';
import { ActionButton} from "../components/ActionButton/ActionButton";

const meta: Meta<typeof ActionButton> = {
    title: 'Components/ActionButton',
    component: ActionButton,
};

export default meta;
type Story = StoryObj<typeof ActionButton>;

export const Default: Story = {
    args: {
        children: 'Click me',
        onClick: () => alert('Button clicked'),
    },
};