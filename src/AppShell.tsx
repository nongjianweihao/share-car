import React, { ReactNode } from 'react';

interface AppShellProps {
    sidebar: ReactNode;
    children: ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ sidebar, children }) => (
    <div className="app-container">
        <aside className="sidebar">{sidebar}</aside>
        <main className="main-content">{children}</main>
    </div>
);

export default AppShell;
