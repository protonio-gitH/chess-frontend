import APIService from './api';
import ReduxService from './store';
import type { Store } from 'redux';
import type { UnknownAction } from '@reduxjs/toolkit';
import { Config } from './config';

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

	public getRedux(): Store<unknown, UnknownAction> {
		if (!this.reduxService) {
			this.reduxService = new ReduxService(this.config.redux);
		}
		return this.reduxService.getStore();
	}
}
