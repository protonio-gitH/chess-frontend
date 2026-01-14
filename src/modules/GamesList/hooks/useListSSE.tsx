import { useEffect } from 'react';
import { config } from '../../../config';
import { setGamesList } from '../store/list.slice';
import { useAppDispatch } from '../../../store';

export const useListSSE = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const eventSource = new EventSource(`${config.api.baseUrl}/events/games`);
		eventSource.onmessage = event => {
			const data = JSON.parse(event.data);
			console.log('Received SSE data:', data);
			dispatch(setGamesList(data));
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
