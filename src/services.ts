import APIService from './api';
import { Config } from './config';

export class Services {
	private config: Config;
	private apiService!: APIService;

	constructor(config: Config) {
		this.config = config;
	}

	public getApi(): APIService {
		if (!this.apiService) {
			this.apiService = new APIService(this, this.config.api);
		}
		return this.apiService;
	}
}
