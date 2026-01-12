import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, ConfigRedux, RootState } from '../types';
import authReducer from './auth.slice';
import { services } from '../servicesInstance';
import listReducer from '../modules/GamesList/store/list.slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		list: listReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: { api: services.getApi() },
			},
		}),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
