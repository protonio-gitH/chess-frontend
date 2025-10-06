import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './Game';
import Main from './Main';
import Layout from '../components/Layout';
import Modal from '../components/ui/Modal';
import { useModal } from '../hooks/useModal';
import LoginForm, { LoginFormData } from '../components/ui/LoginForm';
import RegForm from '../components/ui/RegForm';

function App() {
	// const [modalOptions, setModalOptions] = useState<ModalOptions>({
	// 	modalType: '',
	// 	open: false,
	// });
	const { modalOptions, setModalOptions } = useModal();

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
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Main />} />
					<Route path="game" element={<Game />} />
				</Route>
			</Routes>
			<Modal>{renderContent()}</Modal>
		</BrowserRouter>
	);
}

export default App;
