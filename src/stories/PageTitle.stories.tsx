import { Meta, StoryObj } from '@storybook/react';
import { PageTitle} from "../components/PageTitle/PageTitle";

const meta: Meta<typeof PageTitle> = {
    title: 'Components/PageTitle',
    component: PageTitle,
};

export default meta;
type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {
    args: {
        title: 'Sample Page Title',
    },
};