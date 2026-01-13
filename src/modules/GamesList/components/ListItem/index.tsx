import { memo, FC } from 'react';
import styles from './index.module.scss';
import { Box } from '@mui/material';

interface ListItemProps {
	email: string;
}

const ListItem: FC<ListItemProps> = ({ email }) => {
	return (
		<Box className={styles['game-list__item']} component={'li'}>
			{email}
		</Box>
	);
};

export default memo(ListItem);
