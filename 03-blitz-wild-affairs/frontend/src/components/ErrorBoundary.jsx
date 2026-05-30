// src/components/ErrorBoundary.jsx
// Catches unexpected render errors and shows a friendly fallback UI.
import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to your error tracking service (Sentry, etc.) here
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-center bg-white dark:bg-gray-950">
        <div className="max-w-md">
          <p className="text-7xl mb-6">💥</p>
          <h1 className="font-display font-bold text-3xl text-gray-900 dark:text-white mb-3">
            Something went wrong
          </h1>
          <p className="text-gray-500 text-sm mb-2">
            An unexpected error occurred. Our team has been notified.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-4 text-left text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl overflow-auto max-h-40">
              {this.state.error.toString()}
            </pre>
          )}
          <div className="flex gap-3 justify-center mt-8">
            <button
              onClick={this.handleReset}
              className="btn-brand"
            >
              Go Home
            </button>
            <button
              onClick={() => window.location.reload()}
              className="btn-ghost"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }
}
