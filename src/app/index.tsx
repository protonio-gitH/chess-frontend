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
import { useAuthEffect } from '../hooks/useAuthEffect';
import SnackBarContainer from '../containers/SnackBarContainer';
import { CreateGame } from '../modules/GamesBar';

function App() {
	const { modalOptions, setModalOptions } = useModal();

	const isAuth = useAppSelector(state => state.auth.isAuth);

	useAuthEffect();

	const renderContent = () => {
		switch (modalOptions.modalType) {
			case 'login':
				return <LoginForm />;
			case 'register':
				return <RegForm />;
			case 'createGame':
				return <CreateGame />;
			default:
				return null;
		}
	};

	return (
		<ErrorBoundary>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout isAuth={isAuth} />}>
						<Route index element={<Main />} />
						<Route path="game" element={<Game />} />
					</Route>
				</Routes>
				<Modal>{renderContent()}</Modal>
			</BrowserRouter>
			<SnackBarContainer />
		</ErrorBoundary>
	);
}

export default App;
