import { memo, FC } from 'react';
import styles from './index.module.scss';
import { Box } from '@mui/material';
import ListItem from '../ListItem';
import { Margin } from '@mui/icons-material';
import { Game } from '../../types';
interface ListProps {
	items: Game[];
	acceptGameHandler: (gameId: string) => Promise<void>;
}

const List: FC<ListProps> = ({ items, acceptGameHandler }) => {
	return (
		<Box component={'ul'} sx={{ width: '50%', margin: '0 auto;' }}>
			{items.map(item => {
				return <ListItem key={item.id} email={item.creator.email} itemId={item.id} onAccept={acceptGameHandler} />;
			})}
		</Box>
	);
};

export default memo(List);
