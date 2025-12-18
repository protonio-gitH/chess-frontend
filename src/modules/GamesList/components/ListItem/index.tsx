import { memo, FC } from 'react';
import styles from './index.module.scss';
import { Box } from '@mui/material';

interface ListItemProps {
	nick: string;
}

const ListItem: FC<ListItemProps> = ({ nick }) => {
	return (
		<Box className={styles['game-list__item']} component={'li'}>
			{nick}
		</Box>
	);
};

export default memo(ListItem);
