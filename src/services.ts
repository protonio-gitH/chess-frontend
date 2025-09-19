import APIService from './api/client';
import { Config } from './config';

export default class Services {
	private config: Config;
	private declare apiService: APIService;
	constructor(config: Config) {
		this.config = config;
	}

	get api(): APIService {
		if (!this.api) {
			this.apiService = new APIService(this, this.config.api);
		}
		return this.apiService;
	}
}
