import { FC, useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { SnackbarState } from '../../types';
import { useAppSelector } from '../../store';

const SnackBarContainer: FC = () => {
	const [snackBarState, setSnackBarState] = useState<SnackbarState>({
		open: false,
		vertical: 'top',
		horizontal: 'right',
		type: 'error',
		message: null,
	});
	const { vertical, horizontal, open, type, message } = snackBarState;
	const handleClose = () => {
		setSnackBarState(prev => ({ ...prev, open: false }));
	};

	const error = useAppSelector(state => state.auth.error);

	useEffect(() => {
		if (error) {
			setSnackBarState(prev => ({ ...prev, open: true, message: error, type: 'error' }));
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
