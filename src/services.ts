import APIService from './api/client';

class Services {
	private config: unknown;
	private declare apiService: APIService;
	constructor(config: unknown) {
		this.config = config;
	}

	get api(): APIService {
		if (!this.api) {
			this.apiService = new APIService(this);
		}
		return this.apiService;
	}
}
