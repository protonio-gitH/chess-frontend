import { FC } from 'react';
import LoginForm from '../../components/LoginForm';
import RegForm from '../../components/RegForm';
import { AuthFormData, ModalType } from '../../types';
import { useAppDispatch } from '../../store';
import handleThunk from '../../utils/handleThunk';
import { loginThunk, registrationThunk } from '../../store/auth.slice';
import { useModal } from '../../hooks/useModal';

const AuthModalContainer: FC = () => {
	const { modalOptions, setModalOptions } = useModal();
	const dispatch = useAppDispatch();
	const authHandler = async (formData: AuthFormData) => {
		if (formData.type === '/auth/login') {
			await handleThunk(dispatch, loginThunk, formData);
		} else if (formData.type === '/auth/registration') {
			await handleThunk(dispatch, registrationThunk, formData);
		}
	};
	if (modalOptions.modalType === 'login') return <LoginForm authHandler={authHandler} />;
	if (modalOptions.modalType === 'register') return <RegForm authHandler={authHandler} />;
	return null;
};
export default AuthModalContainer;
