import React from 'react';
import './StatisticsDisplay.css';

interface Stats {
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    draws: number;
}

interface StatisticsDisplayProps {
    username: string;
    stats: Stats;
}

export const StatisticsDisplay: React.FC<StatisticsDisplayProps> = ({ username, stats }) => (
    <div className="statistics-display">
        <h2 className="statistics-title">Statistics for {username}</h2>
        <p>Games Played: {stats.gamesPlayed}</p>
        <p>Games Won: {stats.gamesWon}</p>
        <p>Games Lost: {stats.gamesLost}</p>
        <p>Draws: {stats.draws}</p>
    </div>
);