import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'جاري التحميل...', fullScreen = false }) => {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };

  const spinnerStyle = {
    width: sizeMap[size],
    height: sizeMap[size],
    border: `4px solid #f3f3f3`,
    borderTop: `4px solid #667eea`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto'
  };

  const containerStyle = fullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.9)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  } : {
    textAlign: 'center',
    padding: '40px'
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
      {text && (
        <p style={{ 
          marginTop: '15px', 
          color: '#666',
          fontSize: '16px'
        }}>
          {text}
        </p>
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
