import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';
import '../styles/layout.css';

const Layout = ({ children }) => {
    const { user } = useAuth();

    return (
        <div className="app-layout">
            <Sidebar role={user?.role} />
            <div className="main-content">
                <Topbar user={user} />
                <main className="page-content">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
