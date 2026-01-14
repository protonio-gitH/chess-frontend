import { memo, FC, useCallback } from 'react';
import styles from './index.module.scss';
import List from '../../components/List';
import { useListSSE } from '../../hooks/useListSSE';
import { useServices } from '../../../../hooks/useServices';
import { useAppSelector } from '../../../../store';
import { decodeToken } from '../../../../utils/decodeToken';

const GamesListContainer: FC = () => {
	useListSSE();
	const services = useServices();
	const gameList = useAppSelector(state => state.list.gamesList);
	const api = services.getApi();
	const token = useAppSelector(state => state.auth.token);
	const decodedToken = decodeToken(token);

	const acceptGameHandler = useCallback(
		async (gameId: string): Promise<void> => {
			if (!decodedToken?.userId) return;

			try {
				await api.request('/game/accept', {
					method: 'POST',
					data: { userId: decodedToken.userId, gameId },
				});
			} catch (e) {
				console.error('Failed to accept game:', e);
			}
		},
		[api, decodedToken?.userId],
	);

	return <List items={gameList} acceptGameHandler={acceptGameHandler} />;
};

export default GamesListContainer;
