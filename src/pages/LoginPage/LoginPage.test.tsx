import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import { useMyContext } from '../../MyContext';
import { loginService } from '../../api/loginService';
import { registerService } from '../../api/registerService';

// Mock the required modules and hooks
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
jest.mock('../../MyContext');
jest.mock('../../api/loginService');
jest.mock('../../api/registerService');

describe('LoginPage', () => {
    const mockUpdateJsonData = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useMyContext as jest.Mock).mockReturnValue({ updateJsonData: mockUpdateJsonData });
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        expect(screen.getByText('Login Page')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('Log In')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
    });

    it('handles login successfully', async () => {
        (loginService as jest.Mock).mockResolvedValue(undefined);

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Log In'));

        await waitFor(() => {
            expect(loginService).toHaveBeenCalledWith('testuser', 'password123');
            expect(mockUpdateJsonData).toHaveBeenCalledWith({ usernameJSON: 'testuser' });
            expect(mockNavigate).toHaveBeenCalledWith('/profile');
        });
    });

    it('handles login failure', async () => {
        (loginService as jest.Mock).mockRejectedValue(new Error('Login failed'));

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByText('Log In'));

        await waitFor(() => {
            expect(screen.getByText('Login failed. Wrong username or password')).toBeInTheDocument();
        });
    });

    it('handles register successfully', async () => {
        (registerService as jest.Mock).mockResolvedValue(undefined);

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'newpassword' } });
        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => {
            expect(registerService).toHaveBeenCalledWith('newuser', 'newpassword');
            expect(mockUpdateJsonData).toHaveBeenCalledWith({ usernameJSON: 'newuser' });
            expect(mockNavigate).toHaveBeenCalledWith('/profile');
        });
    });

    it('handles register failure', async () => {
        (registerService as jest.Mock).mockRejectedValue(new Error('Register failed'));

        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'existinguser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => {
            expect(screen.getByText('Register failed. Username already exists')).toBeInTheDocument();
        });
    });
});