import { FC } from 'react';
import CreateGame from '../../components/CreateGame';
import { ModalType } from '../.././../../types';

interface CreateGameModalContainerProps {
	modalType: ModalType | null;
}

const CreateGameModalContainer: FC<CreateGameModalContainerProps> = ({ modalType }) => {
	if (modalType === 'createGame') return <CreateGame />;
	return null;
};

export default CreateGameModalContainer;
