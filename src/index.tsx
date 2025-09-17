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
		<Provider store={store}>
			<ModalProvider>
				<App />
			</ModalProvider>
		</Provider>
	</React.StrictMode>,
);
