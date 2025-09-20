import APIService from './api/client';
import ReduxService from './store';
import type { Store } from 'redux';
import type { AnyAction } from '@reduxjs/toolkit';
import { Config, config } from './config';

export class Services {
	private config: Config;
	private apiService!: APIService;
	private reduxService!: ReduxService;

	constructor(config: Config) {
		this.config = config;
	}

	public getApi(): APIService {
		if (!this.apiService) {
			this.apiService = new APIService(this, this.config.api);
		}
		return this.apiService;
	}

	public getRedux(): Store<unknown, AnyAction> {
		if (!this.reduxService) {
			this.reduxService = new ReduxService(this.config.redux);
		}
		return this.reduxService.getStore();
	}
}

export const services = new Services(config);
