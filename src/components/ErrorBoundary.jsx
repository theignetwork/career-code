import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to analytics service in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Career Code Assessment Error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
          <div className="max-w-md mx-auto px-4">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Oops! Something went wrong
              </h2>

              <p className="text-gray-600 mb-6">
                We encountered an unexpected error. Don't worry, your assessment data is safe.
              </p>

              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center px-6 py-3 text-white bg-primary hover:bg-blue-700 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </button>

              {process.env.NODE_ENV === 'development' && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 mb-2">
                    Error Details (Development Only)
                  </summary>
                  <div className="bg-gray-100 rounded p-3 text-xs font-mono">
                    <div className="text-red-600 mb-2">
                      {this.state.error && this.state.error.toString()}
                    </div>
                    <div className="text-gray-600">
                      {this.state.errorInfo.componentStack}
                    </div>
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;