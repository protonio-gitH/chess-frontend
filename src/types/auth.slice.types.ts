import APIService from '../api';

export interface Extra {
	api: APIService;
}

export interface LoginResponse {
	accessToken: string;
}

export interface AuthState {
	isAuth: boolean;
	token: string | null;
	loading: boolean;
	error: string | null;
}
