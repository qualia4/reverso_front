import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import { useMyContext } from '../MyContext';
import { playService } from '../api/playService';
import { getStatsService } from '../api/getStatsService';
import { waitingForPlayerService } from '../api/waitingForPlayerService';

// Mock the required modules and hooks
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
jest.mock('../MyContext');
jest.mock('../api/playService');
jest.mock('../api/getStatsService');
jest.mock('../api/waitingForPlayerService');

describe('ProfilePage', () => {
    const mockNavigate = jest.fn();
    const mockUpdateJsonData = jest.fn();
    const mockUsername = 'testuser';

    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        (useMyContext as jest.Mock).mockReturnValue({
            jsonData: { usernameJSON: mockUsername },
            updateJsonData: mockUpdateJsonData,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        expect(screen.getByText('Main Menu')).toBeInTheDocument();
        expect(screen.getByText('Play PvP')).toBeInTheDocument();
        expect(screen.getByText('Play PvE')).toBeInTheDocument();
        expect(screen.getByText('Play Minimax PvE')).toBeInTheDocument();
        expect(screen.getByText('Show Stats')).toBeInTheDocument();
    });

    it('navigates to home if no username', () => {
        (useMyContext as jest.Mock).mockReturnValue({
            jsonData: { usernameJSON: null },
            updateJsonData: mockUpdateJsonData,
        });

        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('handles PvP play click correctly', async () => {
        (playService as jest.Mock).mockResolvedValue({ lobbyId: '123', gameStarted: true });

        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Play PvP'));

        await waitFor(() => {
            expect(playService).toHaveBeenCalledWith(mockUsername, 'pvp');
            expect(mockUpdateJsonData).toHaveBeenCalledWith({ lobbyIDJSON: '123', usernameJSON: mockUsername });
            expect(mockNavigate).toHaveBeenCalledWith('/game');
        });
    });

    it('handles PvE play click correctly', async () => {
        (playService as jest.Mock).mockResolvedValue({ lobbyId: '456', gameStarted: false });
        (waitingForPlayerService as jest.Mock).mockResolvedValue(undefined);

        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Play PvE'));

        await waitFor(() => {
            expect(playService).toHaveBeenCalledWith(mockUsername, 'pve');
            expect(waitingForPlayerService).toHaveBeenCalledWith('456');
            expect(mockUpdateJsonData).toHaveBeenCalledWith({ lobbyIDJSON: '456', usernameJSON: mockUsername });
            expect(mockNavigate).toHaveBeenCalledWith('/game');
        });
    });

    it('handles show stats click correctly', async () => {
        const mockStats = {
            gamesPlayed: 10,
            gamesWon: 5,
            gamesLost: 4,
            draws: 1,
        };
        (getStatsService as jest.Mock).mockResolvedValue(mockStats);

        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Show Stats'));

        await waitFor(() => {
            expect(getStatsService).toHaveBeenCalledWith(mockUsername);
            expect(screen.getByText(`Statistics for ${mockUsername}`)).toBeInTheDocument();
            expect(screen.getByText('10')).toBeInTheDocument(); // gamesPlayed
            expect(screen.getByText('5')).toBeInTheDocument(); // gamesWon
            expect(screen.getByText('4')).toBeInTheDocument(); // gamesLost
            expect(screen.getByText('1')).toBeInTheDocument(); // draws
        });
    });

    it('handles Minimax PvE play click correctly', async () => {
        (playService as jest.Mock).mockResolvedValue({ lobbyId: '789', gameStarted: true });

        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Play Minimax PvE'));

        await waitFor(() => {
            expect(playService).toHaveBeenCalledWith(mockUsername, 'pvmm');
            expect(mockUpdateJsonData).toHaveBeenCalledWith({ lobbyIDJSON: '789', usernameJSON: mockUsername });
            expect(mockNavigate).toHaveBeenCalledWith('/game');
        });
    });

    it('handles error in play service', async () => {
        console.error = jest.fn(); // Mock console.error
        (playService as jest.Mock).mockRejectedValue(new Error('Play service error'));

        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Play PvP'));

        await waitFor(() => {
            expect(console.error).toHaveBeenCalled();
            expect(screen.queryByTestId('profile-loader')).not.toBeInTheDocument();
        });
    });

    it('handles error in get stats service', async () => {
        console.error = jest.fn(); // Mock console.error
        (getStatsService as jest.Mock).mockRejectedValue(new Error('Get stats error'));

        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Show Stats'));

        await waitFor(() => {
            expect(console.error).toHaveBeenCalled();
            expect(screen.queryByTestId('profile-loader')).not.toBeInTheDocument();
        });
    });

    it('displays and hides loader correctly', async () => {
        (playService as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ lobbyId: '123', gameStarted: true }), 100)));

        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Play PvP'));

        expect(screen.getByTestId('profile-loader')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByTestId('profile-loader')).not.toBeInTheDocument();
        });
    });

    it('handles waiting for player correctly', async () => {
        (playService as jest.Mock).mockResolvedValue({ lobbyId: '123', gameStarted: false });
        (waitingForPlayerService as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Play PvP'));

        expect(screen.getByTestId('profile-loader')).toBeInTheDocument();

        await waitFor(() => {
            expect(waitingForPlayerService).toHaveBeenCalledWith('123');
            expect(mockNavigate).toHaveBeenCalledWith('/game');
            expect(screen.queryByTestId('profile-loader')).not.toBeInTheDocument();
        });
    });
});