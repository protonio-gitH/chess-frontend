import { memo, FC } from 'react';
import styles from './index.module.scss';
import List from '../../components/List';

const testItems = [{ nick: 'test1' }, { nick: 'test2' }];

const GamesListContainer: FC = () => {
	return <List items={testItems} />;
};

export default memo(GamesListContainer);
