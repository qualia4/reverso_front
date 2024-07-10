// src/components/InputField/InputField.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { InputField} from "../components/InputField/InputField";

const meta: Meta<typeof InputField> = {
    title: 'Components/InputField',
    component: InputField,
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Text: Story = {
    args: {
        type: 'text',
        placeholder: 'Enter text',
        value: '',
        onChange: () => {},
    },
};

export const Password: Story = {
    args: {
        type: 'password',
        placeholder: 'Enter password',
        value: '',
        onChange: () => {},
    },
};