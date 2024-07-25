import { Meta, StoryObj } from '@storybook/react';
import { StatisticsDisplay} from "../components/StatisticsDisplay/StatisticsDisplay";

const meta: Meta<typeof StatisticsDisplay> = {
    title: 'Components/StatisticsDisplay',
    component: StatisticsDisplay,
};

export default meta;
type Story = StoryObj<typeof StatisticsDisplay>;

export const Default: Story = {
    args: {
        username: 'JohnDoe',
        stats: {
            gamesPlayed: 10,
            gamesWon: 5,
            gamesLost: 3,
            draws: 2,
        },
    },
};