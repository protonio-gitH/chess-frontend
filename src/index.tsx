import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './styles/index.scss';
import App from './app';
import 'normalize.css';
import { ModalProvider } from './hooks/useModal';
import { ServicesContext } from './hooks/useServices';
import { Services } from './services';
import { config } from './config';
import { store } from './store';

export const services = new Services(config);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<ServicesContext.Provider value={services}>
			<Provider store={store}>
				<ModalProvider>
					<App />
				</ModalProvider>
			</Provider>
		</ServicesContext.Provider>
	</React.StrictMode>,
);
