import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          background: '#f8f9fa',
          borderRadius: '10px',
          margin: '20px 0'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
          <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>
            حدث خطأ غير متوقع
          </h2>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            نعتذر عن هذا الخطأ. يرجى إعادة تحميل الصفحة أو المحاولة مرة أخرى.
          </p>
          
          <div style={{ marginBottom: '20px' }}>
            <button 
              className="btn" 
              onClick={() => window.location.reload()}
              style={{ marginRight: '10px' }}
            >
              إعادة تحميل الصفحة
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            >
              المحاولة مرة أخرى
            </button>
          </div>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ 
              textAlign: 'left', 
              background: '#fff', 
              padding: '20px', 
              borderRadius: '5px',
              marginTop: '20px'
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                تفاصيل الخطأ (للمطورين)
              </summary>
              <pre style={{ 
                whiteSpace: 'pre-wrap', 
                fontSize: '12px',
                color: '#dc3545',
                marginTop: '10px'
              }}>
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
