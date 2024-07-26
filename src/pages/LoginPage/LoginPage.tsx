import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../../MyContext';
import { loginService } from '../../api/loginService';
import { registerService } from '../../api/registerService';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import './LoginPage.css';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { updateJsonData } = useMyContext();

    const handleLogin = async (username: string, password: string) => {
        await loginService(username, password);
        updateJsonData({ usernameJSON: username });
        navigate('/profile');
    };

    const handleRegister = async (username: string, password: string) => {
        await registerService(username, password);
        updateJsonData({ usernameJSON: username });
        navigate('/profile');
    };

    return (
        <main className="login-container">
            <h1 className="login-title">Login Page</h1>
            <LoginForm onLogin={handleLogin} onRegister={handleRegister} />
        </main>
    );
};

export default LoginPage;
