import React from 'react';
import Error from '@/pages/Error';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // update state to show fallback UI in next render
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // log error to error logging service
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // send error to error reporting service
    // e.g. Sentry, LogRocket, etc.
  }

  render() {
    if (this.state.hasError) {
      // customize fallback UI
      return <Error />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
