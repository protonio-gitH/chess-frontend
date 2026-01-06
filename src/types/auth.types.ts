import { loginDataSchema, registrationDataSchema } from '../schemas';
import { z } from 'zod';

export type LoginFormData = z.infer<typeof loginDataSchema>;
export type RegistrationFormData = z.infer<typeof registrationDataSchema>;

export type AuthFormData = LoginFormData | RegistrationFormData;
