import React from 'react';
import '../styles/components.css';

const Card = ({ title, value, icon, color }) => {
    return (
        <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
            <div className="stat-content">
                <h4 className="stat-title">{title}</h4>
                <h2 className="stat-value">{value}</h2>
            </div>
            {icon && <div className="stat-icon" style={{ color: color }}>{icon}</div>}
        </div>
    );
};

export default Card;
