import { useEffect } from 'react';
import { config } from '../../../config';

export const useListSSE = () => {
	useEffect(() => {
		const eventSource = new EventSource(`${config.api.baseUrl}/events/games`);
		eventSource.onmessage = event => {
			const data = JSON.parse(event.data);
			console.log('Received SSE data:', data);
			// Handle the received data (e.g., update state)
		};

		eventSource.onerror = error => {
			console.error('SSE error:', error);
			eventSource.close();
		};

		return () => {
			eventSource.close();
		};
	}, []);
};
