import AuthModalContainer from '../AuthModalContainer';
import { CreateGameModalContainer } from '../../modules/GamesBar';
import { ModalOptions } from '../../types';
import { FC } from 'react';

interface ModalContainerProps {
	modalOptions: ModalOptions;
}

const ModalContainer: FC<ModalContainerProps> = ({ modalOptions }) => {
	return (
		<>
			<AuthModalContainer modalType={modalOptions.modalType} />
			<CreateGameModalContainer modalType={modalOptions.modalType} />
		</>
	);
};

export default ModalContainer;
