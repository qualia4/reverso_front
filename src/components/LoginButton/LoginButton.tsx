import React from 'react';
import './LoginButton.css';

interface ButtonProps {
    onClick: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

export const LoginButton: React.FC<ButtonProps> = ({ onClick, disabled, children }) => (
    <button
        className="button"
        onClick={onClick}
        disabled={disabled}
    >
        {children}
    </button>
);