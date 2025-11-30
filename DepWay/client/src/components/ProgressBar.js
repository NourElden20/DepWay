import React from 'react';

const ProgressBar = ({ 
  progress = 0, 
  total = 100, 
  showPercentage = true, 
  showSteps = false,
  steps = [],
  currentStep = 0,
  color = '#667eea',
  height = '8px',
  animated = true
}) => {
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100);

  const containerStyle = {
    width: '100%',
    background: '#f0f0f0',
    borderRadius: '10px',
    overflow: 'hidden',
    height: height,
    position: 'relative'
  };

  const progressStyle = {
    height: '100%',
    background: `linear-gradient(90deg, ${color}, ${color}dd)`,
    borderRadius: '10px',
    width: `${percentage}%`,
    transition: animated ? 'width 0.3s ease' : 'none',
    position: 'relative',
    overflow: 'hidden'
  };

  const animatedStyle = animated ? {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      animation: 'shimmer 2s infinite'
    }
  } : {};

  const stepContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    fontSize: '12px',
    color: '#666'
  };

  const stepStyle = (index) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    position: 'relative'
  });

  const stepIndicatorStyle = (index) => ({
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: index <= currentStep ? color : '#e0e0e0',
    color: index <= currentStep ? 'white' : '#666',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
    marginBottom: '5px',
    transition: 'all 0.3s ease'
  });

  const stepLineStyle = (index) => ({
    position: 'absolute',
    top: '10px',
    left: '50%',
    right: '-50%',
    height: '2px',
    background: index < currentStep ? color : '#e0e0e0',
    zIndex: -1,
    transition: 'all 0.3s ease'
  });

  return (
    <div>
      <div style={containerStyle}>
        <div style={progressStyle}>
          {animated && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              animation: 'shimmer 2s infinite'
            }}></div>
          )}
        </div>
      </div>
      
      {showPercentage && (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '10px', 
          fontSize: '14px',
          color: '#666',
          fontWeight: '500'
        }}>
          {Math.round(percentage)}%
        </div>
      )}

      {showSteps && steps.length > 0 && (
        <div style={stepContainerStyle}>
          {steps.map((step, index) => (
            <div key={index} style={stepStyle(index)}>
              <div style={stepIndicatorStyle(index)}>
                {index < currentStep ? '✓' : index + 1}
              </div>
              <div style={{ 
                textAlign: 'center', 
                fontSize: '11px',
                color: index <= currentStep ? color : '#999'
              }}>
                {step}
              </div>
              {index < steps.length - 1 && (
                <div style={stepLineStyle(index)}></div>
              )}
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;