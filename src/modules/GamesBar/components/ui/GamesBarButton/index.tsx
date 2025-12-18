import React, { FC, memo } from 'react';
import Button from '@mui/material/Button';
import { ModalType } from '../../../../../types';

interface GamesBarButtonProps {
	children: React.ReactNode;
	onClick: (type: ModalType) => void;
}

const GamesBarButton: FC<GamesBarButtonProps> = ({ children, onClick }) => {
	return (
		<Button
			onClick={() => onClick('createGame')}
			variant="contained"
			sx={{
				padding: {
					xs: '0.375rem 0.75rem',
					sm: '0.5rem 1rem',
					md: '0.625rem 1.25rem',
				},
				fontSize: { xs: '0.5rem', sm: '0.7rem', md: '0.85rem' },
			}}
		>
			{children}
		</Button>
	);
};

export default memo(GamesBarButton);
