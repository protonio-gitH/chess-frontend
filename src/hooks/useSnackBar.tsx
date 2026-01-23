import { useEffect, useState } from 'react';
import { useServices } from './useServices';
import { SnackBarServiceState } from '../types';

export const useSnackBar = (): {
	snackBarState: SnackBarServiceState;
	setSnackBarState: (state: Partial<SnackBarServiceState>) => void;
} => {
	const snackBarSerivice = useServices().getSnackBar();
	const [snackBarState, setSnackBarState] = useState<SnackBarServiceState>(snackBarSerivice.getState());

	useEffect(() => {
		const changeState = (state: Partial<SnackBarServiceState>): void => {
			setSnackBarState(prev => ({ ...prev, ...state }));
		};

		const sub = snackBarSerivice.subscribe(changeState);

		return () => {
			sub();
		};
	}, [snackBarSerivice]);

	return { snackBarState, setSnackBarState: snackBarSerivice.setState.bind(snackBarSerivice) };
};
