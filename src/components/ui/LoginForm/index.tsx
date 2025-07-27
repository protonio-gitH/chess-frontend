import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import styles from './index.module.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const LoginForm = () => {
	return (
		<Box component={'form'} className="auth-form" id={styles['login-form']}>
			<Typography
				id="modal-modal-title"
				component="h2"
				className="form-title"
				sx={{
					fontSize: 'var(--form-font-size)',
				}}
			>
				Login
			</Typography>
			<TextField required id="outlined-required" label="Login" />
			<TextField required id="outlined-required" label="Password" />
			<Button>Submit</Button>
		</Box>
	);
};

export default LoginForm;
