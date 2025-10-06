import { Config } from '../config';
import { Services } from '../services';
import { ApiResponse, ConfigAPI, RequestOptions } from '../types';

export default class APIService {
	private headers: Record<string, string>;
	private services: Services;
	private baseUrl: string = 'http://localhost:4000';

	constructor(services: Services, config: ConfigAPI) {
		this.headers = {
			'Content-Type': 'application/json',
		};
		this.services = services;
	}

	public async request<T = unknown>(
		path: string,
		method: string = 'GET',
		headers: Record<string, string> = {},
		options: RequestOptions = {},
	): Promise<ApiResponse<T>> {
		const response = await fetch(`${this.baseUrl}${path}`, {
			method,
			headers: { ...this.headers, ...headers },
			...options,
		});

		return { data: await response.json(), status: response.status, headers: response.headers };
	}

	public setHeader(key: string, value: string): void {
		this.headers[key] = value;
	}

	public removeHeader(key: keyof typeof this.headers): void {
		delete this.headers[key];
	}
}
