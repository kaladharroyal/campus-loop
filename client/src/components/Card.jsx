import React, { useState } from 'react';
import '../styles/components.css';

const Card = ({ title, value, icon, color, trend, trendValue, subtitle }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <div 
                className="stat-card"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Accent Border */}
                <div className="card-border" style={{ background: color }}></div>

                {/* Background Decoration */}
                <div className="card-bg-decoration" style={{ 
                    background: `radial-gradient(circle at 100% 0%, ${color}15 0%, transparent 60%)`
                }}></div>

                {/* Content */}
                <div className="card-content">
                    {/* Header */}
                    <div className="card-header">
                        <div className="card-title-section">
                            <h4 className="card-title">{title}</h4>
                            {subtitle && (
                                <p className="card-subtitle">{subtitle}</p>
                            )}
                        </div>
                        {icon && (
                            <div className="card-icon-wrapper" style={{ background: `${color}15` }}>
                                <span className="card-icon" style={{ color: color }}>
                                    {icon}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Value */}
                    <div className="card-body">
                        <h2 className="card-value" style={{ color: color }}>
                            {value}
                        </h2>
                        
                        {/* Trend Indicator */}
                        {trend && trendValue && (
                            <div className={`trend-indicator ${trend}`}>
                                <span className="trend-icon">
                                    {trend === 'up' ? '↗' : '↘'}
                                </span>
                                <span className="trend-value">{trendValue}</span>
                                <span className="trend-label">vs last month</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="card-hover-overlay"></div>
            </div>

            <style jsx>{`
                .stat-card {
                    position: relative;
                    background: var(--bg-primary);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    padding: 24px;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow: hidden;
                    cursor: pointer;
                    animation: fadeInScale 0.6s cubic-bezier(0.4, 0, 0.2, 1) backwards;
                }

                .stat-card:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-xl);
                    border-color: transparent;
                }

                /* Card Border */
                .card-border {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .stat-card:hover .card-border {
                    height: 6px;
                }

                /* Background Decoration */
                .card-bg-decoration {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                }

                .stat-card:hover .card-bg-decoration {
                    opacity: 1;
                }

                /* Content */
                .card-content {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                /* Header */
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 16px;
                }

                .card-title-section {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .card-title {
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--text-secondary);
                    margin: 0;
                    letter-spacing: 0.3px;
                    text-transform: uppercase;
                }

                .card-subtitle {
                    font-size: 12px;
                    color: var(--text-tertiary);
                    margin: 0;
                }

                .card-icon-wrapper {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .stat-card:hover .card-icon-wrapper {
                    transform: scale(1.1) rotate(5deg);
                }

                .card-icon {
                    font-size: 24px;
                    line-height: 1;
                }

                /* Body */
                .card-body {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .card-value {
                    font-size: 36px;
                    font-weight: 700;
                    margin: 0;
                    line-height: 1;
                    letter-spacing: -1px;
                    transition: all 0.3s ease;
                }

                .stat-card:hover .card-value {
                    transform: scale(1.05);
                }

                /* Trend Indicator */
                .trend-indicator {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 600;
                    width: fit-content;
                    transition: all 0.3s ease;
                }

                .trend-indicator.up {
                    background: #10b98115;
                    color: #059669;
                }

                .trend-indicator.down {
                    background: #ef444415;
                    color: #dc2626;
                }

                .trend-icon {
                    font-size: 16px;
                    font-weight: bold;
                }

                .trend-value {
                    font-weight: 700;
                }

                .trend-label {
                    color: var(--text-tertiary);
                    font-weight: 500;
                    font-size: 11px;
                }

                .stat-card:hover .trend-indicator {
                    transform: translateX(4px);
                }

                /* Hover Overlay */
                .card-hover-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, transparent 0%, var(--primary) 100%);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                    mix-blend-mode: overlay;
                }

                .stat-card:hover .card-hover-overlay {
                    opacity: 0.03;
                }

                /* Animations */
                @keyframes fadeInScale {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                /* Responsive */
                @media (max-width: 640px) {
                    .stat-card {
                        padding: 20px;
                    }

                    .card-value {
                        font-size: 28px;
                    }

                    .card-icon-wrapper {
                        width: 40px;
                        height: 40px;
                    }

                    .card-icon {
                        font-size: 20px;
                    }
                }
            `}</style>
        </>
    );
};

export default Card;