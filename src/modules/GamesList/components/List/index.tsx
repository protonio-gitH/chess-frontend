import { memo, FC } from 'react';
import styles from './index.module.scss';
import { Box } from '@mui/material';
import ListItem from '../ListItem';
import { Margin } from '@mui/icons-material';
interface ListProps {
	items: { nick: string }[];
}

const List: FC<ListProps> = ({ items }) => {
	return (
		<Box component={'ul'} sx={{ width: '50%', margin: '0 auto;' }}>
			{items.map(item => {
				return <ListItem key={item.nick} nick={item.nick} />;
			})}
		</Box>
	);
};

export default memo(List);
