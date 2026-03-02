// socket.ts
import { io, Socket } from 'socket.io-client';
import { Services } from '../services';
import { ClientToServerEvents, ConfigAPI, ServerToClientEvents } from '../types';

export default class SocketService {
	private socket: Socket;

	constructor(services: Services, config: ConfigAPI) {
		this.socket = io(config.baseUrl, { autoConnect: false });
	}

	public connect(): void {
		if (!this.socket.connected) {
			this.socket.connect();
		}
	}

	public disconnect(): void {
		this.socket.disconnect();
	}

	public on<K extends keyof ServerToClientEvents>(event: K, cb: ServerToClientEvents[K]) {
		this.socket.on(event, cb as any);
	}

	public emit<K extends keyof ClientToServerEvents>(event: K, ...args: Parameters<ClientToServerEvents[K]>) {
		this.socket.emit(event, ...args);
	}

	public getId(): string | undefined {
		return this.socket.id;
	}
}
