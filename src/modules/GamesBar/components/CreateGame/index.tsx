import { Box, Button, Stack } from '@mui/material';
import React, { FC, memo } from 'react';

interface CreateGameProps {
	createGameHandler: () => void;
}

const CreateGame: FC<CreateGameProps> = ({ createGameHandler }) => {
	return (
		<Stack>
			<Button
				onClick={createGameHandler}
				variant="outlined"
				sx={{
					margin: '0 auto',
					padding: {
						xs: '0.3rem 0.65rem',
						sm: '0.4rem 0.8rem',
						md: '0.6rem 1rem',
					},
					fontSize: { xs: '0.4rem', sm: '0.6rem', md: '0.75rem' },
				}}
			>
				Создать запрос на игру
			</Button>
		</Stack>
	);
};

export default memo(CreateGame);
