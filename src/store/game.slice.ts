import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { LoginResponse, AuthState, ErrorResponse, Extra, GameState, Game } from '../types';
import { AxiosError, isAxiosError } from 'axios';
// cmkeixb4q000kgth4b18vpnbq
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
		// const error = e as AxiosError<ErrorResponse>;
		if (isAxiosError<ErrorResponse>(e)) {
			if (e.response) {
				return rejectWithValue({
					message: e.response.data?.message ?? 'Get game info failed',
					status: e.response.status,
				});
			}
			return rejectWithValue({
				message: e.message || 'Network error',
				status: 0,
			});
		}
		throw e;
	}
});

const initialState: GameState = {
	gameInfo: undefined,
	status: 'idle',
	errorStatus: undefined,
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getGameInfoThunk.pending, state => {
				state.status = 'loading';
			})
			.addCase(getGameInfoThunk.fulfilled, (state, action) => {
				state.status = 'success';
				state.gameInfo = action.payload;
			})
			.addCase(getGameInfoThunk.rejected, (state, action) => {
				state.status = 'error';
				state.errorStatus = action.payload?.status;
			});
	},
});

export const {} = gameSlice.actions;
export default gameSlice.reducer;
