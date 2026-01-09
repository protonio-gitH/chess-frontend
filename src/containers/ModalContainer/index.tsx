import AuthModalContainer from '../AuthModalContainer';
import { CreateGameModalContainer } from '../../modules/GamesBar';
import { FC } from 'react';

const ModalContainer: FC = () => {
	return (
		<>
			<AuthModalContainer />
			<CreateGameModalContainer />
		</>
	);
};

export default ModalContainer;
