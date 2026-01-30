import React from 'react';

const ProfilePassword = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <div className="card-ui" style={{ padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center', backgroundColor: '#fcfcfc', border: '1px solid #f1f5f9' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#101828', fontWeight: '800', marginBottom: '20px' }}>Reset Password</h4>
                <p style={{ color: '#667085', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '24px' }}>
                    Click the button below to receive a password reset link in your email.
                </p>
                <button
                    className="btn-primary"
                    style={{ background: '#101828', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: '700', fontSize: '0.9rem', width: '100%' }}
                >
                    Get Reset Link
                </button>
            </div>
        </div>
    );
};

export default ProfilePassword;
