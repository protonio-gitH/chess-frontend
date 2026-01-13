import { memo, FC } from 'react';
import styles from './index.module.scss';
import List from '../../components/List';
import { useListSSE } from '../../hooks/useListSSE';
import { useServices } from '../../../../hooks/useServices';
import { useAppSelector } from '../../../../store';

const testItems = [{ nick: 'test1' }, { nick: 'test2' }];

const GamesListContainer: FC = () => {
	useListSSE();
	const services = useServices();

	const gameList = useAppSelector(state => state.list.gamesList);

	const acceptGame = () => {};

	return <List items={gameList} />;
};

export default GamesListContainer;
