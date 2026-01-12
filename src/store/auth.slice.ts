import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import type { LoginResponse, AuthState, ErrorResponse, Extra } from '../types';
import { AxiosError } from 'axios';

function isErrorResponse(data: LoginResponse | ErrorResponse | null): data is ErrorResponse {
	if (data === null) {
		return false;
	}
	return 'message' in data;
}

export const loginThunk = createAsyncThunk<
	LoginResponse,
	{ email: string; password: string; type: '/auth/login' | '/auth/registration' },
	{ rejectValue: ErrorResponse; extra: Extra }
>('auth/login', async (credentials, { extra, rejectWithValue }) => {
	const { type, email, password } = credentials;

	try {
		const response = await extra.api.request<LoginResponse>(type, {
			method: 'POST',
			data: {
				email,
				password,
			},
		});
		return response.data;
	} catch (e) {
		const error = e as AxiosError<ErrorResponse>;

		if (error.response) {
			return rejectWithValue({
				message: error.response.data?.message ?? 'Request failed',
				status: error.response.status,
			});
		}

		return rejectWithValue({
			message: error.message || 'Network error',
			status: 0,
		});
	}
});

export const registrationThunk = createAsyncThunk<
	LoginResponse,
	{ email: string; password: string; confirmPassword: string; type: '/auth/login' | '/auth/registration' },
	{ rejectValue: ErrorResponse; extra: Extra }
>('auth/login', async (credentials, { extra, rejectWithValue }) => {
	const { type, email, password } = credentials;

	try {
		const response = await extra.api.request<LoginResponse>(type, {
			method: 'POST',
			data: {
				email,
				password,
			},
		});
		return response.data;
	} catch (e) {
		const error = e as AxiosError<ErrorResponse>;

		if (error.response) {
			return rejectWithValue({
				message: error.response.data?.message ?? 'Request failed',
				status: error.response.status,
			});
		}

		return rejectWithValue({
			message: error.message || 'Network error',
			status: 0,
		});
	}
});

export const logoutThunk = createAsyncThunk<null, void, { rejectValue: ErrorResponse; extra: Extra }>(
	'auth/logout',
	async (_, { extra, rejectWithValue }) => {
		try {
			const response = await extra.api.request<null>('/auth/logout', {
				method: 'GET',
			});

			return response.data;
		} catch (e) {
			const error = e as AxiosError<ErrorResponse>;

			if (error.response) {
				return rejectWithValue({
					message: error.response.data?.message ?? 'Logout failed',
					status: error.response.status,
				});
			}

			return rejectWithValue({
				message: error.message || 'Network error',
				status: 0,
			});
		}
	},
);

const initialState: AuthState = {
	isAuth: false,
	token: null,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess(state, action) {
			state.token = action.payload;
			state.isAuth = true;
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(loginThunk.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.isAuth = true;
				state.token = action.payload ? action.payload.accessToken : null;
			})
			.addCase(loginThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : null;
			})
			.addCase(logoutThunk.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(logoutThunk.fulfilled, state => {
				state.loading = false;
				state.isAuth = false;
				state.token = null;
			})
			.addCase(logoutThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : null;
			});
	},
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
