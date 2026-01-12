import React, { useState, memo, FC } from 'react';
import Box from '@mui/material/Box';
import styles from './index.module.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormTextField from '../FormTextField';
import { AuthFormData } from '../../types';
import { loginDataSchema } from '../../schemas';
import type { LoginFormData } from '../../types';

interface LoginProps {
	authHandler: (formData: AuthFormData) => Promise<void>;
}

const initialState = {
	email: '',
	password: '',
	type: '/auth/login',
};

const LoginForm: FC<LoginProps> = ({ authHandler }) => {
	const [userFormData, setUserFormData] = useState<LoginFormData>({
		email: '',
		password: '',
		type: '/auth/login',
	});
	const [isErrors, setIsErrors] = useState<boolean>(false);

	const formData = {
		...initialState,
		...userFormData,
	};

	const validate = () => {
		const res = loginDataSchema.safeParse(formData);
		if (res.success) return undefined;
		return res.error.format();
	};

	const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const errors = validate();
		if (errors) {
			setIsErrors(true);
			return;
		}
		await authHandler(userFormData);
	};

	const errors = isErrors ? validate() : undefined;

	return (
		<Box onSubmit={e => handlerSubmit(e)} component={'form'} className="auth-form" id={styles['login-form']}>
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
			<FormTextField
				label="Email"
				required
				value={formData.email}
				onChange={e => setUserFormData(l => ({ ...l, email: e.target.value }))}
				error={errors?.email?._errors}
			/>
			<FormTextField
				label="Password"
				required
				value={formData.password}
				onChange={e => setUserFormData(l => ({ ...l, password: e.target.value }))}
				error={errors?.password?._errors}
			/>
			<Button type="submit">Submit</Button>
		</Box>
	);
};

export default memo(LoginForm);
