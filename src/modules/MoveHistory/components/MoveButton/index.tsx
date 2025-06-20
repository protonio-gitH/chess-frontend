import { memo, FC } from 'react';
import styles from './index.module.scss';
import { Move, HandleMoveClick } from '../../types/moveTypes';

interface MoveButtonProps {
	move: Move;
	handleMoveClick: HandleMoveClick;
	index: number;
}

const MoveButton: FC<MoveButtonProps> = ({ move, handleMoveClick, index }) => {
	const handleClick = () => handleMoveClick(move);

	return (
		<li className={styles.moveList__item}>
			<button onClick={handleClick} type="button">
				{move.title}
			</button>
		</li>
	);
};

export default memo(MoveButton);
