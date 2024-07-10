import { Meta, StoryObj } from '@storybook/react';
import { Loader } from "../components/Loader/Loader";

const meta: Meta<typeof Loader> = {
    title: 'Components/Loader',
    component: Loader,
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {};