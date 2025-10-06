import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, ConfigRedux, RootState } from '../types';
import authReducer from './authSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
