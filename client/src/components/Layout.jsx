import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';
import '../styles/layout.css';

const Layout = ({ children }) => {
    const { user } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className="app-layout">
            <Sidebar role={user?.role} isOpen={mobileMenuOpen} onClose={closeMobileMenu} />

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 99
                    }}
                    onClick={closeMobileMenu}
                />
            )}

            <div className="main-content">
                <Topbar user={user} onToggleMenu={toggleMobileMenu} />
                <main className="page-content">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
