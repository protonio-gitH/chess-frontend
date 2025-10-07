import { ReactNode } from 'react';
import { Component } from 'react';
import React from 'react';

type ErrorBoundaryProps = {
	children: ReactNode;
};

type ErrorBoundaryState = {
	hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('smth error', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <h1>Что-то пошло не так :(</h1>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
