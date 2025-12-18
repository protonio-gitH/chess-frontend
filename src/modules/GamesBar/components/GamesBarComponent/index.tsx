import React, { FC, useCallback } from 'react';
import GamesBarButton from '../ui/GamesBarButton';
import { useModal } from '../../../../hooks/useModal';
import { ModalType } from '../../../../types';
import { Box } from '@mui/material';

const GamesBarComponent: FC = () => {
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

export default GamesBarComponent;
