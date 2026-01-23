import { useEffect, useState } from 'react';
import { useServices } from './useServices';
import { SnackBarState } from '../types';

export const useSnackBar = (): {
	snackBarState: SnackBarState;
	setSnackBarState: (state: Partial<SnackBarState>) => void;
} => {
	const snackBarSerivice = useServices().getSnackBar();
	const [snackBarState, setSnackBarState] = useState<SnackBarState>(snackBarSerivice.getState());

	useEffect(() => {
		const changeState = (state: Partial<SnackBarState>): void => {
			setSnackBarState(prev => ({ ...prev, ...state }));
		};

		const sub = snackBarSerivice.subscribe(changeState);

		return () => {
			sub();
		};
	}, [snackBarSerivice]);

	return { snackBarState, setSnackBarState: snackBarSerivice.setState.bind(snackBarSerivice) };
};
