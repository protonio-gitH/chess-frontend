import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse, AuthState, ErrorResponse, Extra } from '../types';

function isErrorResponse(data: LoginResponse | ErrorResponse): data is ErrorResponse {
	return 'message' in data;
}

export const loginThunk = createAsyncThunk<
	LoginResponse,
	{ email: string; password: string },
	{ rejectValue: ErrorResponse; extra: Extra }
>('auth/login', async (credentials, { extra, rejectWithValue }) => {
	try {
		const response = await extra.api.request<LoginResponse | ErrorResponse>(
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
	isAuth: false,
	token: null,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess(state, action: PayloadAction<string>) {
			state.token = action.payload;
			state.isAuth = true;
			state.error = null;
		},
		logout(state) {
			state.token = null;
			state.isAuth = false;
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
				state.token = action.payload ? action.payload.token : null;
			})
			.addCase(loginThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : null;
			});
	},
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
