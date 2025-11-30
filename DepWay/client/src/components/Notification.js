import React, { useState, useEffect } from 'react';

const Notification = ({ type = 'info', message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success': return '#28a745';
      case 'error': return '#dc3545';
      case 'warning': return '#ffc107';
      case 'info': return '#17a2b8';
      default: return '#17a2b8';
    }
  };

  const notificationStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: 'white',
    border: `2px solid ${getColor()}`,
    borderRadius: '10px',
    padding: '15px 20px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    minWidth: '300px',
    maxWidth: '500px',
    zIndex: 10000,
    transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  };

  const iconStyle = {
    fontSize: '20px',
    flexShrink: 0
  };

  const messageStyle = {
    flex: 1,
    color: '#333',
    fontSize: '14px',
    lineHeight: '1.4'
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#666',
    padding: '5px',
    borderRadius: '50%',
    width: '25px',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={notificationStyle} onClick={handleClose}>
      <div style={iconStyle}>{getIcon()}</div>
      <div style={messageStyle}>{message}</div>
      <button 
        style={closeButtonStyle}
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        onMouseEnter={(e) => {
          e.target.style.background = '#f8f9fa';
          e.target.style.color = '#333';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'none';
          e.target.style.color = '#666';
        }}
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
