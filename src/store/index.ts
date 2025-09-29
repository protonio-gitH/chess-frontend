import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, ConfigRedux, RootState } from '../types';

export default class ReduxService {
	private store: ReturnType<typeof configureStore>;
	constructor(config: ConfigRedux) {
		this.store = configureStore({
			reducer: {},
		});
	}

	public getStore(): typeof this.store {
		return this.store;
	}
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
