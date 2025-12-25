import { memo, FC } from 'react';
import styles from './index.module.scss';
import List from '../../components/List';
import { useListSSE } from '../../hooks/useListSSE';
import { useServices } from '../../../../hooks/useServices';

const testItems = [{ nick: 'test1' }, { nick: 'test2' }];

const GamesListContainer: FC = () => {
	useListSSE();
	const services = useServices();

	return <List items={testItems} />;
};

export default memo(GamesListContainer);
