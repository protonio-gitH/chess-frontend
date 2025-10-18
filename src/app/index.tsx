import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './Game';
import Main from './Main';
import Layout from '../components/Layout';
import Modal from '../components/ui/Modal';
import { useModal } from '../hooks/useModal';
import LoginForm from '../components/ui/LoginForm';
import RegForm from '../components/ui/RegForm';
import ErrorBoundary from './ErrorBoundary';
import { useAppDispatch, useAppSelector } from '../store';
import { useServices } from '../hooks/useServices';
import { isTokenOverdue } from '../utils/isTokenOvedue';
import { decodeToken } from '../utils/decodeToken';
import { loginSuccess } from '../store/authSlice';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface State extends SnackbarOrigin {
	open: boolean;
	type: typeof Alert.prototype.props.severity;
	message: string | null;
}

function App() {
	const { modalOptions, setModalOptions } = useModal();
	const [snackBarState, setSnackBackState] = useState<State>({
		open: false,
		vertical: 'top',
		horizontal: 'right',
		type: 'error',
		message: null,
	});
	const { vertical, horizontal, open, type, message } = snackBarState;

	const services = useServices();
	const isAuth = useAppSelector(state => state.auth.isAuth);
	const token = useAppSelector(state => state.auth.token);
	const error = useAppSelector(state => state.auth.error);
	const dispatch = useAppDispatch();

	function handleClose() {
		setSnackBackState(prev => ({ ...prev, open: false }));
	}

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		if (storedToken) {
			const decodedToken = decodeToken(storedToken);
			if (decodedToken && !isTokenOverdue(decodedToken.exp)) {
				services.getApi().setHeader('Authorization', `Bearer ${storedToken}`);
				dispatch(loginSuccess(storedToken));
			}
		}
	}, []);

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		if (isAuth && storedToken !== token) {
			const api = services.getApi();
			modalOptions.open && setModalOptions(prev => ({ ...prev, open: false }));
			if (token) {
				api.setHeader('Authorization', `Bearer ${token}`);
				localStorage.setItem('token', token);
			}
		}
	}, [isAuth, token]);

	useEffect(() => {
		if (error) {
			setSnackBackState(prev => ({ ...prev, open: true, message: error, type: 'error' }));
		}
	}, [error]);

	const renderContent = () => {
		switch (modalOptions.modalType) {
			case 'login':
				return <LoginForm />;
			case 'register':
				return <RegForm />;
			default:
				return null;
		}
	};

	return (
		<ErrorBoundary>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Main />} />
						<Route path="game" element={<Game />} />
					</Route>
				</Routes>
				<Modal>{renderContent()}</Modal>
			</BrowserRouter>
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
		</ErrorBoundary>
	);
}

export default App;
