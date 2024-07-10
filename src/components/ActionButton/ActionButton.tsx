import React from 'react';
import './ActionButton.css';

interface ActionButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, children }) => (
    <button className="action-button" onClick={onClick}>
        {children}
    </button>
);