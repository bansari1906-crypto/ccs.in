import React, { ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorCount: number;
}

class ErrorBoundary extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorCount: 0,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorCount: 0,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // You can also send error to a logging service here
    // Example: Sentry, LogRocket, etc.
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorCount: this.state.errorCount + 1,
    });

    // Reload the page if too many errors
    if (this.state.errorCount > 2) {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleReset);
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="rounded-lg border border-border bg-card p-8 shadow-lg max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <h1 className="text-xl font-semibold">Something went wrong</h1>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              {this.state.error.message || 'An unexpected error occurred. Please try again.'}
            </p>

            {process.env.NODE_ENV === 'development' && (
              <details className="mb-4 p-3 bg-muted rounded text-xs">
                <summary className="cursor-pointer font-semibold mb-2">Error Details</summary>
                <pre className="overflow-auto max-h-32 text-muted-foreground">
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <div className="flex gap-2">
              <Button
                onClick={this.handleReset}
                className="flex-1"
                variant="default"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                className="flex-1"
                variant="outline"
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
