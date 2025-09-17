import React, { FC, useState, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useModal } from '../../../hooks/useModal';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'clamp(15rem,37.5vw,30rem)',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const portal = document.getElementById('portal');

interface BasiscModalProps {
	children: React.ReactElement | null;
}

const BasicModal: FC<BasiscModalProps> = ({ children }) => {
	const { modalOptions, setModalOptions } = useModal();

	const handleClose = () => setModalOptions({ ...modalOptions, open: false });

	if (!portal) return null;

	return createPortal(
		<>
			<Modal
				open={modalOptions.open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					{/* <Typography id="modal-modal-title" variant="h6" component="h2">
						Text in a modal
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography> */}
					{children}
				</Box>
			</Modal>
		</>,
		portal,
	);
};

export default memo(BasicModal);
