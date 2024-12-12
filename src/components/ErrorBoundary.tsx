// Error boundary component for handling runtime errors
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom error UI
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  // Initialize error state
  public state: State = {
    hasError: false
  };

  // Update state when error occurs
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Log error details
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    // Show error UI if there's an error
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md">
            <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
            <p className="text-gray-400 mb-4">
              The application encountered an error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-gray-200 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}