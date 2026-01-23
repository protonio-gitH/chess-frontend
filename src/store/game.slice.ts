import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { LoginResponse, AuthState, ErrorResponse, Extra } from '../types';
import { AxiosError } from 'axios';

export const getGameInfoThunk = createAsyncThunk<any, { gameId: string }, { rejectValue: ErrorResponse; extra: Extra }>(
	'game/getGame',
	async ({ gameId }, { extra, rejectWithValue }) => {
		// console.log('123');
		try {
			const response = await extra.api.request<any>('/game/' + gameId, {
				method: 'GET',
			});
			console.log(response.data);
			return response.data;
		} catch (e) {
			const error = e as AxiosError<ErrorResponse>;

			if (error.response) {
				return rejectWithValue({
					message: error.response.data?.message ?? 'Get game info failed',
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

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		loginSuccess(state, action) {
			state.token = action.payload;
			state.isAuth = true;
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder;
	},
});

export const { loginSuccess } = gameSlice.actions;
export default gameSlice.reducer;
