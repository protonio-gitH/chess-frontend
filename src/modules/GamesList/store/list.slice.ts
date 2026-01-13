import { createSlice } from '@reduxjs/toolkit';
import type { ListState } from '../types/';

const initialState: ListState = {
	gamesList: [],
};

const listSlice = createSlice({
	name: 'list',
	initialState,
	reducers: {
		setGamesList(state, action) {
			state.gamesList = action.payload.games;
		},
	},
});

export const { setGamesList } = listSlice.actions;
export default listSlice.reducer;
