import { AsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../types';

export default async function handleThunk<TArg = void, TResult = void, TReject = unknown>(
	dispatch: AppDispatch,
	thunk: AsyncThunk<TResult, TArg, { rejectValue: TReject }>,
	arg?: TArg,
): Promise<TResult | null> {
	try {
		const result = await dispatch(thunk(arg as any)).unwrap();
		return result;
	} catch (err) {
		console.error('Failed to execute thunk:', err);
		return null;
	}
}
