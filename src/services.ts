import APIService from './api';
import { Config } from './config';
import { LoginResponse } from './types';
import axios from 'axios';
import { Mutex } from 'async-mutex';

export class Services {
	private config: Config;
	private apiService!: APIService;
	private mutex!: Mutex;

	constructor(config: Config) {
		this.config = config;
	}

	public getMutex(): Mutex {
		if (!this.mutex) {
			this.mutex = new Mutex();
		}
		return this.mutex;
	}

	public getApi(): APIService {
		if (!this.apiService) {
			this.apiService = new APIService(this, this.config.api);
			const axiosInstance = this.apiService.getAxios();
			const mutex = this.getMutex();

			axiosInstance.interceptors.response.use(
				config => {
					return config;
				},
				async error => {
					const originalRequest = error.config;
					const release = await mutex.acquire();
					if (
						!originalRequest.url.includes('/auth/refresh') &&
						error.response.status === 401 &&
						originalRequest &&
						!originalRequest._isRetry
					) {
						originalRequest._isRetry = true;
						// if (this.apiService.isRefreshing) {
						// 	return new Promise((resolve, reject) => {
						// 		this.apiService.addPendingRequest(() => {
						// 			this.apiService.request(originalRequest.url, originalRequest).then(resolve).catch(reject);
						// 		});
						// 	});
						// }
						this.apiService.isRefreshing = true;
						try {
							return mutex.runExclusive(async () => {
								const refreshResponse = await axios.get<LoginResponse>(`${this.apiService.getBaseUrl()}/auth/refresh`, {
									withCredentials: true,
								});
								this.apiService.setHeader('Authorization', refreshResponse.data.accessToken);
								localStorage.setItem('token', refreshResponse.data.accessToken);
								return this.apiService.request(originalRequest.url, originalRequest);
							});
						} catch (e) {
							console.error('Not authorized');
						} finally {
							this.apiService.isRefreshing = false;
							release();
							// this.apiService.getPendingRequests().forEach(req => req());
							// this.apiService.clearPendingRequests();
						}
					}
					throw error;
				},
			);
		}
		return this.apiService;
	}
}
