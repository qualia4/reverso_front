import { Meta, StoryObj } from '@storybook/react';
import { LoginForm} from "../components/LoginForm/LoginForm";

const meta: Meta<typeof LoginForm> = {
    title: 'Components/LoginForm',
    component: LoginForm,
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
    args: {
        onLogin: async (username, password) => {
            console.log('Login:', username, password);
        },
        onRegister: async (username, password) => {
            console.log('Register:', username, password);
        },
    },
};