type LoginFormData = {
	type: '/auth/login';
	email: string;
	password: string;
};

type RegistrationFormData = {
	type: '/auth/registration';
	email: string;
	password: string;
	confirmPassword: string;
};

export type AuthFormData = LoginFormData | RegistrationFormData;
