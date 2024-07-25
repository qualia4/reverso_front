import React from 'react';
import './ProfileLoader.css';

export const ProfileLoader: React.FC = () => (
    <div className="loader-container" data-testid="profile-loader">
        <div className="loader"></div>
    </div>
);