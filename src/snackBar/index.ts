import { Services } from '../services';
import { SnackBarState } from '../types';

export default class SnackBarService {
	private services: Services;
	private listeners: Array<(state: Partial<SnackBarState>) => void>;
	private state: SnackBarState;

	constructor(services: Services) {
		this.services = services;
		this.state = { open: false, vertical: 'top', horizontal: 'right', type: 'error', message: null };
		this.listeners = [];
	}

	public getState(): SnackBarState {
		return this.state;
	}

	public setState(newState: Partial<SnackBarState>): void {
		this.state = { ...this.state, ...newState };
		this.listeners.forEach(listener => listener(newState));
	}

	public subscribe(listener: (state: Partial<SnackBarState>) => void): () => void {
		this.listeners.push(listener);
		return () => {
			this.listeners = this.listeners.filter(item => item !== listener);
		};
	}
}
