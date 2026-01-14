import { memo, FC } from 'react';
import styles from './index.module.scss';
import { Box } from '@mui/material';

interface ListItemProps {
	email: string;
	itemId: string;
	onAccept: (gameId: string) => Promise<void>;
}

const ListItem: FC<ListItemProps> = ({ email, itemId, onAccept }) => {
	return (
		<Box className={styles['game-list__item']} component={'li'} onClick={() => onAccept(itemId)}>
			{email}
		</Box>
	);
};

export default memo(ListItem);
