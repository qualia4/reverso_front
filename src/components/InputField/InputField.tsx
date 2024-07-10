// src/components/InputField/InputField.tsx
import React from 'react';
import './InputField.css';

interface InputFieldProps {
    type: 'text' | 'password';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export const InputField: React.FC<InputFieldProps> = ({ type, value, onChange, placeholder }) => (
    <input
        className="input-field"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
);