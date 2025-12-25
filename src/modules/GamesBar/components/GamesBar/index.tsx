import React, { FC, useCallback } from 'react';
import GamesBarButton from '../GamesBarButton';
import { useModal } from '../../../../hooks/useModal';
import { ModalType } from '../../../../types';
import { Box } from '@mui/material';

const GamesBar: FC = () => {
	const { modalOptions, setModalOptions } = useModal();
	const openModal = useCallback((type: ModalType) => {
		setModalOptions({ modalType: type, open: true });
	}, []);
	return (
		<Box>
			<GamesBarButton onClick={openModal}>Создать запрос на игру</GamesBarButton>
		</Box>
	);
};

export default GamesBar;
