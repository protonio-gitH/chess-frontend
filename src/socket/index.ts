// socket.ts
import { io, Socket } from 'socket.io-client';
import { Services } from '../services';
import { ConfigAPI } from '../types';

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

	public on(event: string, cb: any) {
		this.socket.on(event, cb);
	}

	public emit(event: string, data: any) {
		this.socket.emit(event, data);
	}

	public getId(): string | undefined {
		return this.socket.id;
	}
}
