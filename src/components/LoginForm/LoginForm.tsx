// src/components/LoginForm/LoginForm.tsx
import React, { useState } from 'react';
import { InputField } from '../InputField/InputField';
import { LoginButton } from '../LoginButton/LoginButton';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader/Loader';
import './LoginForm.css';

interface LoginFormProps {
    onLogin: (username: string, password: string) => Promise<void>;
    onRegister: (username: string, password: string) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayedText, setDisplayedText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLoginClick = async () => {
        setLoading(true);
        try {
            await onLogin(username, password);
        } catch (error) {
            setDisplayedText(
                error instanceof Error
                    ? "Login failed. Wrong username or password"
                    : "An unexpected error occurred"
            );
        }
        setLoading(false);
    };

    const handleRegisterClick = async () => {
        setLoading(true);
        try {
            await onRegister(username, password);
        } catch (error) {
            setDisplayedText(
                error instanceof Error
                    ? "Register failed. Username already exists"
                    : "An unexpected error occurred"
            );
        }
        setLoading(false);
    };

    return (
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
            <InputField
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <InputField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <LoginButton onClick={handleLoginClick} disabled={loading}>Log In</LoginButton>
            <LoginButton onClick={handleRegisterClick} disabled={loading}>Register</LoginButton>
            {displayedText && <ErrorMessage message={displayedText} />}
            {loading && <Loader />}
        </form>
    );
};