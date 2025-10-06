export interface LoginResponse {
	token: string;
}

export interface ErrorResponse {
	message: string;
	status: number;
}

export interface AuthState {
	token: string | null;
	loading: boolean;
	error: string | null;
}
