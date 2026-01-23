import { Services } from '../services';
import { SnackBarServiceState } from '../types';

export default class SnackBarService {
	private services: Services;
	private listeners: Array<(state: Partial<SnackBarServiceState>) => void>;
	private state: SnackBarServiceState;

	constructor(services: Services) {
		this.services = services;
		this.state = { open: false, vertical: 'top', horizontal: 'right', type: 'error', message: null };
		this.listeners = [];
	}

	public getState(): SnackBarServiceState {
		return this.state;
	}

	public setState(newState: Partial<SnackBarServiceState>): void {
		this.state = { ...this.state, ...newState };
		this.listeners.forEach(listener => listener(newState));
	}

	public subscribe(listener: (state: Partial<SnackBarServiceState>) => void): () => void {
		this.listeners.push(listener);
		return () => {
			this.listeners = this.listeners.filter(item => item !== listener);
		};
	}
}
