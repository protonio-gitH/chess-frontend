import { FC, useCallback } from 'react';
import CreateGame from '../../components/CreateGame';
import { useModal } from '../../../../hooks/useModal';
import { useServices } from '../../../../hooks/useServices';
import { useAppSelector } from '../../../../store';
import { decodeToken } from '../../../../utils/decodeToken';

const CreateGameModalContainer: FC = () => {
	const { modalOptions, setModalOptions } = useModal();
	const services = useServices();
	const api = services.getApi();
	const token = useAppSelector(state => state.auth.token);
	const decodedToken = decodeToken(token);
	const createGameHandler = useCallback(async (): Promise<void> => {
		if (decodedToken?.userId) {
			try {
				const response = await api.request('/game', { method: 'POST', data: { creatorId: decodedToken.userId } });
			} catch (e) {
				console.error('Failed to create game:', e);
			}
		}
	}, [api, decodedToken?.userId]);

	if (modalOptions.modalType === 'createGame') return <CreateGame createGameHandler={createGameHandler} />;
	return null;
};

export default CreateGameModalContainer;
