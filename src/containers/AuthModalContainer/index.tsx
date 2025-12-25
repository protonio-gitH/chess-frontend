import { FC } from 'react';
import LoginForm from '../../components/LoginForm';
import RegForm from '../../components/RegForm';
import { ModalType } from '../../types';

interface AuthModalContainerProps {
	modalType: ModalType | null;
}

const AuthModalContainer: FC<AuthModalContainerProps> = ({ modalType }) => {
	if (modalType === 'login') return <LoginForm />;
	if (modalType === 'register') return <RegForm />;
	return null;
};
export default AuthModalContainer;
