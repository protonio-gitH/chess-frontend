import React, { useState, memo, FC } from 'react';
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
};

const formDataSchema = z.object({
	login: z.string().email('Invalid email address').nonempty('Login is required'),
	password: z.string().nonempty('Password is required').min(6, 'Password must be at least 6 characters'),
});

interface LoginFormProps {
	login: (data: LoginFormData) => void;
}

function isValidLoginFormData(data: Partial<LoginFormData>): data is LoginFormData {
	return typeof data.login === 'string' && typeof data.password === 'string';
}

export type LoginFormData = z.infer<typeof formDataSchema>;

const LoginForm: FC<LoginFormProps> = ({ login }) => {
	const [userFormData, setUserFormData] = useState<Partial<LoginFormData>>({});
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
		if (isValidLoginFormData(userFormData)) {
			login(userFormData);
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
				Login
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
			<Button type="submit">Submit</Button>
		</Box>
	);
};

export default memo(LoginForm);
