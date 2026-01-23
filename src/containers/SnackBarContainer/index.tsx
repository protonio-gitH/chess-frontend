import { FC, useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { SnackBarState } from '../../types';
import { useAppSelector } from '../../store';
import { useSnackBar } from '../../hooks/useSnackBar';

const SnackBarContainer: FC = () => {
	const { snackBarState, setSnackBarState } = useSnackBar();
	const { vertical, horizontal, open, type, message } = snackBarState;
	const handleClose = () => {
		setSnackBarState({ open: false });
	};

	const error = useAppSelector(state => state.auth.error);

	useEffect(() => {
		if (error) {
			setSnackBarState({ open: true, message: error, type: 'error' });
		}
	}, [error]);

	return (
		<>
			<Snackbar
				open={open}
				anchorOrigin={{ vertical, horizontal }}
				key={vertical + horizontal}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity={type} variant="filled" sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default SnackBarContainer;
