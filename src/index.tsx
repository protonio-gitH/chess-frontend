import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import './styles/index.scss';
import App from './app';
import 'normalize.css';
import { ModalProvider } from './hooks/useModal';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<ModalProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</ModalProvider>
	</React.StrictMode>,
);
