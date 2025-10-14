import APIService from '../api';

export interface Extra {
	api: APIService;
}

export interface LoginResponse {
	token: string;
}

export interface ErrorResponse {
	message: string;
	status: number;
}

export interface AuthState {
	isAuth: boolean;
	token: string | null;
	loading: boolean;
	error: string | null;
}
