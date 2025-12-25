import React, { FC } from 'react';
import CreateGame from '../../components/CreateGame';
import { useServices } from '../../../../hooks/useServices';
import { CreateGameResponse } from '../../types';
import GamesBarComponent from '../../components/GamesBar';

const GamesBarContainer: FC = () => {
	const services = useServices();
	const api = services.getApi();
	const createGame = async () => {
		const createGameResponse = await api.request<CreateGameResponse>('/game', {
			method: 'POST',
			data: { nick: 'test' },
		});
	};
	return <GamesBarComponent />;
};

export default GamesBarContainer;
