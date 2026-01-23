import APIService from './api';
import { Config } from './config';
import { LoginResponse } from './types';
import axios from 'axios';
import { Mutex } from 'async-mutex';
import SnackBarService from './snackBar';

export class Services {
	private config: Config;
	private apiService!: APIService;
	private mutex!: Mutex;
	private snackBarService!: SnackBarService;

	constructor(config: Config) {
		this.config = config;
	}

	public getMutex(): Mutex {
		if (!this.mutex) {
			this.mutex = new Mutex();
		}
		return this.mutex;
	}

	public getSnackBar(): SnackBarService {
		if (!this.snackBarService) {
			this.snackBarService = new SnackBarService(this);
		}
		return this.snackBarService;
	}

	public getApi(): APIService {
		if (!this.apiService) {
			this.apiService = new APIService(this, this.config.api);
			const axiosInstance = this.apiService.getAxios();
			const mutex = this.getMutex();

			axiosInstance.interceptors.response.use(
				response => response,
				async error => {
					const originalRequest = error.config;

					if (originalRequest.url?.includes('/auth/refresh')) {
						return Promise.reject(error);
					}

					if (!error.response) {
						return Promise.reject(error);
					}

					if (error.response.status !== 401) {
						return Promise.reject(error);
					}

					if (originalRequest._isRetry) {
						return Promise.reject(error);
					}
					originalRequest._isRetry = true;
					await mutex.waitForUnlock();
					if (!mutex.isLocked()) {
						const release = await mutex.acquire();

						try {
							const refreshResponse = await axios.get<LoginResponse>(`${this.apiService.getBaseUrl()}/auth/refresh`, {
								withCredentials: true,
							});

							const newToken = refreshResponse.data.accessToken;

							localStorage.setItem('token', newToken);

							this.apiService.setHeader('Authorization', `Bearer ${newToken}`);
						} catch (refreshError) {
							console.error('Refresh failed');
							throw refreshError;
						} finally {
							release();
						}
					}

					const token = localStorage.getItem('token');

					originalRequest.headers = {
						...originalRequest.headers,
						Authorization: `Bearer ${token}`,
					};

					return axiosInstance(originalRequest);
				},
			);
		}
		return this.apiService;
	}
}
