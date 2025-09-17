import React, { useState, memo } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import styles from './index.module.scss';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { z } from 'zod';
import FormTextField from '../FormTextField';

const initialState = {
	login: '',
	password: '',
	confirmPassword: '',
};

const formDataSchema = z
	.object({
		login: z.string().nonempty('Login is required'),
		password: z.string().nonempty('Password is required').min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string().nonempty('Please confirm your password'),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

type FormData = z.infer<typeof formDataSchema>;

const RegForm = () => {
	const [userFormData, setUserFormData] = useState<Partial<FormData>>({});
	const [isErrors, setIsErrors] = useState<boolean>(false);

	const formData = {
		...initialState,
		...userFormData,
	};

	const validate = () => {
		const res = formDataSchema.safeParse(formData);
		if (res.success) return undefined;
		return res.error.format();
	};

	const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const errors = validate();
		if (errors) {
			setIsErrors(true);
			return;
		}
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
				Registration
			</Typography>
			<FormTextField
				label="Login"
				required
				value={formData.login}
				onChange={e => setUserFormData(l => ({ ...l, login: e.target.value }))}
				error={errors?.login?._errors}
			/>
			<FormTextField
				label="Password"
				required
				value={formData.password}
				onChange={e => setUserFormData(l => ({ ...l, password: e.target.value }))}
				error={errors?.password?._errors}
			/>
			<FormTextField
				label="Confirm password"
				required
				value={formData.confirmPassword}
				onChange={e => setUserFormData(l => ({ ...l, confirmPassword: e.target.value }))}
				error={errors?.confirmPassword?._errors}
			/>
			<Button type="submit">Submit</Button>
		</Box>
	);
};

export default memo(RegForm);
