import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useMyContext } from "../../MyContext";
import GamePage from "./GamePage";
import { getGameInfo } from "../../api/getGameInfo";
import { makeMoveService } from "../../api/makeMoveService";
import { getChatService } from "../../api/getChatService";
import { writeMessageService } from "../../api/writeMessageService";

jest.mock("../../MyContext");
jest.mock("../../api/getGameInfo");
jest.mock("../../api/makeMoveService");
jest.mock("../../api/getChatService");
jest.mock("../../api/writeMessageService");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

const mockContextValue = {
    jsonData: { lobbyIDJSON: "123", usernameJSON: "testuser" },
};

describe("GamePage", () => {
    beforeEach(() => {
        (useMyContext as jest.Mock).mockReturnValue(mockContextValue);
        jest.clearAllMocks();
    });

    it("should render game page correctly", async () => {
        (getGameInfo as jest.Mock).mockResolvedValue({
            points: { testuser: 0, opponent: 0 },
            field: [
                ["-", "-", "-"],
                ["-", "-", "-"],
                ["-", "-", "-"],
            ],
            currentPlayerName: "testuser",
            gameEnded: false,
        });

        (getChatService as jest.Mock).mockResolvedValue([]);

        render(
            <MemoryRouter>
                <GamePage />
            </MemoryRouter>
        );

        expect(await screen.findByText("Score:")).toBeInTheDocument();
    });

    it("should handle sending chat messages correctly", async () => {
        (getGameInfo as jest.Mock).mockResolvedValue({
            points: { testuser: 0, opponent: 0 },
            field: [
                ["-", "-", "-"],
                ["-", "-", "-"],
                ["-", "-", "-"],
            ],
            currentPlayerName: "testuser",
            gameEnded: false,
        });
        (getChatService as jest.Mock).mockResolvedValue([]);
        (writeMessageService as jest.Mock).mockResolvedValue({});

        render(
            <MemoryRouter>
                <GamePage />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText("Type a message...");
        const sendButton = screen.getByText("Send");

        fireEvent.change(input, { target: { value: "Hello!" } });
        fireEvent.click(sendButton);

        await waitFor(() =>
            expect(writeMessageService).toHaveBeenCalledWith("123", "testuser", "Hello!")
        );
    });

    it("should navigate to profile if no jsonData", async () => {
        (useMyContext as jest.Mock).mockReturnValue({ jsonData: {} });

        render(
            <MemoryRouter>
                <GamePage />
            </MemoryRouter>
        );

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/profile"));
    });

    it("should handle move when not current player's turn", async () => {
        (getGameInfo as jest.Mock).mockResolvedValue({
            points: { testuser: 0, opponent: 0 },
            field: [
                ["-", "*", "-"],
                ["-", "-", "-"],
                ["-", "-", "-"],
            ],
            currentPlayerName: "opponent",
            gameEnded: false,
        });

        (getChatService as jest.Mock).mockResolvedValue([]);

        render(
            <MemoryRouter>
                <GamePage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Score:")).toBeInTheDocument();
        });

        const button = await screen.findByRole("button");
        fireEvent.click(button);

        expect(makeMoveService).not.toHaveBeenCalled();
    });

    it("should handle move when it's the current player's turn", async () => {
        const initialGameState = {
            points: { testuser: 0, opponent: 0 },
            field: [
                ["-", "*", "-"],
                ["-", "-", "-"],
                ["-", "-", "-"],
            ],
            currentPlayerName: "testuser",
            gameEnded: false,
        };

        const updatedGameState = {
            points: { testuser: 1, opponent: 0 },
            field: [
                ["-", "testuser", "-"],
                ["-", "-", "-"],
                ["-", "-", "-"],
            ],
            currentPlayerName: "opponent",
            gameEnded: false,
        };

        (getGameInfo as jest.Mock)
            .mockResolvedValueOnce(initialGameState)
            .mockResolvedValueOnce(updatedGameState);

        (getChatService as jest.Mock).mockResolvedValue([]);
        (makeMoveService as jest.Mock).mockResolvedValue({});

        render(
            <MemoryRouter>
                <GamePage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Score:")).toBeInTheDocument();
        });

        // Wait for the game state to be updated
        await waitFor(() => {
            expect(screen.getByText("Your turn")).toBeInTheDocument();
        });

        // Find the playable cell and click it
        const playableCell = screen.getByTestId('cell-0-1');
        fireEvent.click(playableCell);

        await waitFor(() => {
            expect(makeMoveService).toHaveBeenCalledWith("testuser", 0, 1);
            expect(getGameInfo).toHaveBeenCalledTimes(2);
        });

        expect(await screen.findByText("opponent's turn")).toBeInTheDocument();
    });


    it("should clear interval on unmount", async () => {
        const clearIntervalSpy = jest.spyOn(global, "clearInterval");

        (getGameInfo as jest.Mock).mockResolvedValue({
            points: { testuser: 0, opponent: 0 },
            field: [
                ["-", "-", "-"],
                ["-", "-", "-"],
                ["-", "-", "-"],
            ],
            currentPlayerName: "testuser",
            gameEnded: false,
        });

        (getChatService as jest.Mock).mockResolvedValue([]);

        const { unmount } = render(
            <MemoryRouter>
                <GamePage />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText("Score:")).toBeInTheDocument());
        unmount();
        expect(clearIntervalSpy).toHaveBeenCalled();
    });

    it("should render modal correctly when game ends", async () => {
        (getGameInfo as jest.Mock).mockResolvedValue({
            points: { testuser: 10, opponent: 5 },
            field: [
                ["-", "-", "-"],
                ["-", "-", "-"],
                ["-", "-", "-"],
            ],
            currentPlayerName: "testuser",
            gameEnded: true,
        });

        (getChatService as jest.Mock).mockResolvedValue([]);

        render(
            <MemoryRouter>
                <GamePage />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText("You won!")).toBeInTheDocument());
        fireEvent.click(screen.getByText("Go to Profile"));
        expect(mockNavigate).toHaveBeenCalledWith("/profile");
    });
});






