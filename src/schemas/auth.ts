import { z } from 'zod';

export const loginDataSchema = z.object({
	email: z.string().email('Invalid email address').nonempty('Login is required'),
	password: z.string().nonempty('Password is required').min(6, 'Password must be at least 6 characters'),
	type: z.enum(['/auth/login']),
});

export const registrationDataSchema = z
	.object({
		email: z.string().nonempty('Email is required'),
		password: z.string().nonempty('Password is required').min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string().nonempty('Please confirm your password'),
		type: z.enum(['/auth/registration']),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});
