import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { SnackBarState } from '../types';

const initialState: SnackBarState = {
	message: null,
};

const authSlice = createSlice({
	name: 'snackBar',
	initialState,
	reducers: {
		showMessage(state, action: PayloadAction<string>) {
			state.message = action.payload;
		},
	},
});
