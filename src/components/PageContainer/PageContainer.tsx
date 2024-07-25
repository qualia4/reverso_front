import React from 'react';
import './PageContainer.css';

interface PageContainerProps {
    children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => (
    <div className="page-container">{children}</div>
);