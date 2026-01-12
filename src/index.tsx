import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './styles/index.scss';
import App from './app';
import 'normalize.css';
import { ModalProvider } from './hooks/useModal';
import { ServicesContext } from './hooks/useServices';
import { store } from './store';
import { services } from './servicesInstance';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<ServicesContext.Provider value={services}>
				<Provider store={store}>
					<ModalProvider>
						<App />
					</ModalProvider>
				</Provider>
			</ServicesContext.Provider>
		</ThemeProvider>
	</React.StrictMode>,
);
