import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import Topbar from './Topbar';
import Footer from './Footer';

const TeacherLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    // Listen for sidebar collapse state from TeacherSidebar component
    useEffect(() => {
        const handleSidebarChange = (event) => {
            setSidebarCollapsed(event.detail.isCollapsed);
        };

        window.addEventListener('sidebarStateChange', handleSidebarChange);
        return () => window.removeEventListener('sidebarStateChange', handleSidebarChange);
    }, []);

    // Determine layout class based on sidebar state
    const layoutClass = `teacher-layout ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`;

    return (
        <div className={layoutClass}>
            <TeacherSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <div className="main-content">
                <Topbar onMenuClick={toggleSidebar} />
                <div className="page-content">
                    {children || <Outlet />}
                </div>
                <Footer />
            </div>

            <style jsx>{`
                .teacher-layout {
                    display: flex;
                    min-height: 100vh;
                    background: #f9fafb;
                }

                .main-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    margin-left: 285px;
                    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .teacher-layout.sidebar-collapsed .main-content {
                    margin-left: 72px;
                }

                @media (max-width: 768px) {
                    .main-content {
                        margin-left: 0;
                    }
                }

                .page-content {
                    flex: 1;
                    padding: 20px;
                }
            `}</style>
        </div>
    );
};

export default TeacherLayout;
