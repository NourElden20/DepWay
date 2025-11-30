import React from 'react';
import Modal from './Modal';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'تأكيد العملية',
  message = 'هل أنت متأكد من أنك تريد المتابعة؟',
  confirmText = 'تأكيد',
  cancelText = 'إلغاء',
  type = 'warning',
  isLoading = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'danger': return '⚠️';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'success': return '✅';
      default: return '⚠️';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'danger': return '#dc3545';
      case 'warning': return '#ffc107';
      case 'info': return '#17a2b8';
      case 'success': return '#28a745';
      default: return '#ffc107';
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const contentStyle = {
    textAlign: 'center',
    padding: '20px'
  };

  const iconStyle = {
    fontSize: '48px',
    marginBottom: '20px'
  };

  const messageStyle = {
    fontSize: '16px',
    color: '#333',
    marginBottom: '30px',
    lineHeight: '1.5'
  };

  const buttonsStyle = {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center'
  };

  const buttonStyle = (variant) => ({
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '500',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    opacity: isLoading ? 0.7 : 1,
    ...(variant === 'confirm' ? {
      background: getColor(),
      color: 'white'
    } : {
      background: '#f8f9fa',
      color: '#666',
      border: '1px solid #e1e5e9'
    })
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small">
      <div style={contentStyle}>
        <div style={iconStyle}>{getIcon()}</div>
        
        <h3 style={{ 
          marginBottom: '15px', 
          color: '#333',
          fontSize: '20px'
        }}>
          {title}
        </h3>
        
        <p style={messageStyle}>
          {message}
        </p>
        
        <div style={buttonsStyle}>
          <button
            style={buttonStyle('cancel')}
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          
          <button
            style={buttonStyle('confirm')}
            onClick={handleConfirm}
            disabled={isLoading}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {isLoading ? 'جاري المعالجة...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
