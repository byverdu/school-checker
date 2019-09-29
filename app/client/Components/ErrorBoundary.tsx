import React from 'react';

interface ErrorState {
  hasError: boolean;
  errorMsg: string;
}

export default class ErrorBoundary extends React.Component<{}, ErrorState> {
  style: React.CSSProperties
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMsg: ''
    };

    this.style = {
      color: '#CA3C25',
      width: '50%',
      margin: '0 auto',
      position: 'relative',
      top: '100px'
    }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      errorMsg: error.message
    };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={this.style}>
          <h1>Something went wrong. Please try to refresh your page</h1>
          <h3>{this.state.errorMsg}</h3>
        </div>
      );
    }

    return this.props.children; 
  }
}