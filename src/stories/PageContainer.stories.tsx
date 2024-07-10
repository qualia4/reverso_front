import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { PageContainer} from "../components/PageContainer/PageContainer";

const meta: Meta<typeof PageContainer> = {
    title: 'Components/PageContainer',
    component: PageContainer,
};

export default meta;
type Story = StoryObj<typeof PageContainer>;

export const Default: Story = {
    args: {
        children: <div>Page content goes here</div>,
    },
};