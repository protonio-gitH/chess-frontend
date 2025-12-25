import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './Game';
import Main from './Main';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { useModal } from '../hooks/useModal';
import LoginForm from '../components/LoginForm';
import RegForm from '../components/RegForm';
import ErrorBoundary from './ErrorBoundary';
import { useAppDispatch, useAppSelector } from '../store';
import { useServices } from '../hooks/useServices';
import { useAuthEffect } from '../hooks/useAuthEffect';
import SnackBarContainer from '../containers/SnackBarContainer';
import ModalContainer from '../containers/ModalContainer';

function App() {
	const { modalOptions, setModalOptions } = useModal();

	const isAuth = useAppSelector(state => state.auth.isAuth);

	useAuthEffect();

	return (
		<ErrorBoundary>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout isAuth={isAuth} />}>
						<Route index element={<Main />} />
						<Route path="game" element={<Game />} />
					</Route>
				</Routes>
				<Modal>
					<ModalContainer modalOptions={modalOptions} />
				</Modal>
			</BrowserRouter>
			<SnackBarContainer />
		</ErrorBoundary>
	);
}

export default App;
