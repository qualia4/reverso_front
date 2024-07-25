import React from 'react';
import './PageTitle.css';

interface PageTitleProps {
    title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
    <h1 className="page-title">{title}</h1>
);