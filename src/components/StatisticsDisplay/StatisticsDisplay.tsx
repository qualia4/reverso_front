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
    <>
        <h2 className="statistics-title">Statistics for {username}</h2>
        <div className="statistics-grid">
            <div className="statistic-item">
                <span className="statistic-label">Games Played:</span>
                <span className="statistic-value">{stats.gamesPlayed}</span>
            </div>
            <div className="statistic-item">
                <span className="statistic-label">Games Won:</span>
                <span className="statistic-value">{stats.gamesWon}</span>
            </div>
            <div className="statistic-item">
                <span className="statistic-label">Games Lost:</span>
                <span className="statistic-value">{stats.gamesLost}</span>
            </div>
            <div className="statistic-item">
                <span className="statistic-label">Draws:</span>
                <span className="statistic-value">{stats.draws}</span>
            </div>
        </div>
    </>
);