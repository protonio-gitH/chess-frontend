import { Config } from '../config';

export interface ApiResponse<T> {
	data: T;
	status: number;
	headers: Headers;
}

export type ConfigAPI = Config['api'];

export type RequestOptions = Omit<RequestInit, 'method' | 'headers'>;
