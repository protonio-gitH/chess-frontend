import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { LoginResponse, AuthState, ErrorResponse, Extra, GameState, Game } from '../types';
import { AxiosError } from 'axios';

export const getGameInfoThunk = createAsyncThunk<
	Game,
	{ gameId: string },
	{ rejectValue: ErrorResponse; extra: Extra }
>('game/getGame', async ({ gameId }, { extra, rejectWithValue }) => {
	try {
		const response = await extra.api.request<Game>('/game/' + gameId, {
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
});

const initialState: GameState = {
	gameInfo: null,
	loading: false,
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getGameInfoThunk.pending, state => {
				state.loading = true;
			})
			.addCase(getGameInfoThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.gameInfo = action.payload;
			})
			.addCase(getGameInfoThunk.rejected, (state, action) => {
				state.loading = false;
			});
	},
});

export const {} = gameSlice.actions;
export default gameSlice.reducer;
