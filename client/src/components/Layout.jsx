import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';
import { useLayout } from '../context/LayoutContext';
import '../styles/layout.css';

const Layout = ({ children }) => {
    const { user } = useAuth();
    const { isSidebarHidden } = useLayout();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    // Listen for sidebar collapse state from Sidebar component
    useEffect(() => {
        const handleSidebarChange = (event) => {
            setSidebarCollapsed(event.detail.isCollapsed);
            
            // Broadcast to entire app (for child components like Home)
            window.dispatchEvent(new CustomEvent('sidebarStateChange', {
                detail: {
                    state: isSidebarHidden ? 'hidden' : event.detail.isCollapsed ? 'collapsed' : 'expanded',
                    isCollapsed: event.detail.isCollapsed,
                    isSidebarHidden: isSidebarHidden
                }
            }));
        };

        window.addEventListener('sidebarStateChange', handleSidebarChange);
        return () => window.removeEventListener('sidebarStateChange', handleSidebarChange);
    }, [isSidebarHidden]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine layout class based on states
    let layoutClass = 'app-layout';
    if (isSidebarHidden) {
        layoutClass += ' full-width-mode';
    } else if (sidebarCollapsed) {
        layoutClass += ' collapsed-mode';
    } else {
        layoutClass += ' expanded-mode';
    }

    return (
        <div className={layoutClass}>
            <Sidebar 
                role={user?.role} 
                isOpen={mobileMenuOpen} 
                onClose={closeMobileMenu} 
                hidden={isSidebarHidden} 
            />

            {/* Mobile Overlay - Click to close sidebar */}
            {mobileMenuOpen && !isSidebarHidden && (
                <div
                    className="mobile-overlay"
                    onClick={closeMobileMenu}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'transparent',
                        zIndex: 99,
                        animation: 'fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                />
            )}

            <div className={`main-content ${isScrolled ? 'scrolled' : ''}`}>
                <Topbar user={user} onToggleMenu={toggleMobileMenu} />
                <main className="page-content">
                    <div className="content-wrapper">
                        {children}
                    </div>
                </main>
                <Footer />
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .content-wrapper {
                    animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Layout;