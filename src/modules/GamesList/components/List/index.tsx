import { memo, FC } from 'react';
import styles from './index.module.scss';
import { Box } from '@mui/material';
import ListItem from '../ListItem';
import { Margin } from '@mui/icons-material';
import { Game } from '../../types';
interface ListProps {
	items: Game[];
}

const List: FC<ListProps> = ({ items }) => {
	return (
		<Box component={'ul'} sx={{ width: '50%', margin: '0 auto;' }}>
			{items.map(item => {
				return <ListItem key={item.id} email={item.creator.email} />;
			})}
		</Box>
	);
};

export default memo(List);
