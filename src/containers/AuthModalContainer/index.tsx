import { FC } from 'react';
import LoginForm from '../../components/LoginForm';
import RegForm from '../../components/RegForm';
import { AuthFormData, ModalType } from '../../types';
import { useAppDispatch } from '../../store';
import handleThunk from '../../utils/handleThunk';
import { loginThunk, registrationThunk } from '../../store/authSlice';

interface AuthModalContainerProps {
	modalType: ModalType | null;
}

const AuthModalContainer: FC<AuthModalContainerProps> = ({ modalType }) => {
	const dispatch = useAppDispatch();
	const authHandler = async (formData: AuthFormData) => {
		if (formData.type === '/auth/login') {
			await handleThunk(dispatch, loginThunk, formData);
		} else if (formData.type === '/auth/registration') {
			await handleThunk(dispatch, registrationThunk, formData);
		}
	};
	if (modalType === 'login') return <LoginForm authHandler={authHandler} />;
	if (modalType === 'register') return <RegForm authHandler={authHandler} />;
	return null;
};
export default AuthModalContainer;
