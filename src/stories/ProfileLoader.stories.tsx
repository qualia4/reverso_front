import { Meta, StoryObj } from '@storybook/react';
import { ProfileLoader} from "../components/ProfileLoader/ProfileLoader";

const meta: Meta<typeof ProfileLoader> = {
    title: 'Components/ProfileLoader',
    component: ProfileLoader,
};

export default meta;
type Story = StoryObj<typeof ProfileLoader>;

export const Default: Story = {};