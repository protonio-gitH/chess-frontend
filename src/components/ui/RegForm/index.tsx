import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import styles from './index.module.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const RegForm = () => {
	return (
		<Box component={'form'} className="auth-form" id={styles['registartion-form']}>
			<Typography
				id="modal-modal-title"
				component="h2"
				className="form-title"
				sx={{
					fontSize: 'var(--form-font-size)',
				}}
			>
				Registration
			</Typography>
			<TextField required id="outlined-required" label="Login" />
			<TextField required id="outlined-required" label="Password" />
			<TextField required id="outlined-required" label="Confirm password" />
			<Button>Submit</Button>
		</Box>
	);
};

export default RegForm;
