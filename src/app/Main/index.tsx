import React from 'react';
import { Box, Container, Stack, useMediaQuery } from '@mui/material';
import { GamesListContainer } from '../../modules/GamesList';
import { useAppSelector, useAppDispatch } from '../../store';
import { GamesBarContainer } from '../../modules/GamesBar';

function Main() {
	const isMobile = useMediaQuery('(max-width:600px)');
	const isAuth = useAppSelector(state => state.auth.isAuth);
	const token = useAppSelector(state => state.auth.token);
	const dispatch = useAppDispatch();

	return (
		<Container maxWidth={'xl'}>
			<Stack
				direction={isMobile ? 'column' : 'row'}
				spacing={2}
				alignItems={isMobile ? 'center' : 'normal'}
				justifyContent={'center'}
			>
				<GamesListContainer />
				{isAuth && <GamesBarContainer />}
			</Stack>
		</Container>
	);
}

export default Main;
