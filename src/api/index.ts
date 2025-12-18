import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ConfigAPI } from '../types';
import { Services } from '../services';

export default class APIService {
	private axiosInstance: AxiosInstance;
	private baseUrl: string;
	private services: Services;
	private pendingRequests: any = [];
	public isRefreshing: boolean = false;

	constructor(services: Services, config: ConfigAPI) {
		this.baseUrl = config.baseUrl;
		this.services = services;
		this.axiosInstance = axios.create({
			baseURL: this.baseUrl,
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	public async request<T = unknown>(path: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
		const response: AxiosResponse<T> = await this.axiosInstance.request<T>({
			url: path,
			...options,
		});
		return response;
	}

	public addPendingRequest(request: any): void {
		this.pendingRequests.push(request);
	}

	public getPendingRequests(): Array<any> {
		return this.pendingRequests;
	}

	public clearPendingRequests(): void {
		this.pendingRequests = [];
	}

	public setHeader(key: string, value: string): void {
		this.axiosInstance.defaults.headers.common[key] = value;
	}

	public removeHeader(key: string): void {
		delete this.axiosInstance.defaults.headers.common[key];
	}

	public getAxios(): AxiosInstance {
		return this.axiosInstance;
	}

	public getServices(): Services {
		return this.services;
	}

	public getBaseUrl(): string {
		return this.baseUrl;
	}
}
