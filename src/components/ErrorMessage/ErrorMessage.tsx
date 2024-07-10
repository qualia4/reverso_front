// src/components/ErrorMessage/ErrorMessage.tsx
import React from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <p className="error-message">{message}</p>
);