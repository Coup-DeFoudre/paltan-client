'use client';

import React, { Component, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center bg-slate-800/30 rounded-2xl border border-slate-700/30 m-4">
          <div className="text-center text-slate-400 max-w-md mx-auto p-8">
            <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-amber-500" />
            <h2 className="text-xl font-bold text-white mb-4">कुछ गलत हो गया</h2>
            <p className="text-sm mb-6 leading-relaxed">
              इस सेक्शन को लोड करने में समस्या हुई है। कृपया दोबारा कोशिश करें या बाद में वापस आएं।
            </p>
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              दोबारा कोशिश करें
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
