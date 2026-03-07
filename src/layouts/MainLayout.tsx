import React from 'react'

interface MainLayoutProps {
    children: React.ReactNode
}

/**
 * MainLayout serves as the base layout wrapper for all pages
 * Can be extended to include shared navigation, sidebars, etc.
 */
export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="main-layout">
            {children}
        </div>
    )
}
