import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { services } from '..';
import { jwtDecode } from 'jwt-decode';
import { LoginResponse, AuthState, ErrorResponse } from '../types';
import { PayloadAction } from '@reduxjs/toolkit';

function isErrorResponse(data: LoginResponse | ErrorResponse): data is ErrorResponse {
	return 'message' in data;
}

export const loginThunk = createAsyncThunk<
	LoginResponse,
	{ email: string; password: string },
	{ rejectValue: ErrorResponse }
>('auth/login', async (credentials, { rejectWithValue }) => {
	try {
		const api = services.getApi();
		const response = await api.request<LoginResponse | ErrorResponse>(
			'/auth/login',
			'POST',
			{},
			{
				body: JSON.stringify(credentials),
			},
		);
		if (isErrorResponse(response.data)) {
			return rejectWithValue({ message: response.data.message, status: response.status });
		}

		return response.data;
	} catch (e) {
		console.error('Ошибка при запросе /auth/login:', e);

		return rejectWithValue({
			message: e instanceof Error ? e.message : 'Unknown error',
			status: 0,
		});
	}
});

const initialState: AuthState = {
	token: null,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(loginThunk.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.token = action.payload ? action.payload.token : null;
			})
			.addCase(loginThunk.rejected, (state, action) => {
				console.log(action.payload);
				state.loading = false;
				state.error = action.payload ? action.payload.message : null;
			});
	},
});

export default authSlice.reducer;
