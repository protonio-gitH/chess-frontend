import { memo, FC } from 'react';
import styles from './index.module.scss';
import type { Move, HandleMoveClick } from '../../types/';

interface MoveButtonProps {
	move: Move;
	handleMoveClick: HandleMoveClick;
	index: number;
	currentMove: Move | null;
}

const MoveButton: FC<MoveButtonProps> = ({ move, handleMoveClick, index, currentMove }) => {
	const handleClick = () => handleMoveClick(move);

	return (
		<li className={currentMove?.title !== move.title ? styles.moveList__item : styles['moveList__item--current']}>
			<button onClick={handleClick} type="button">
				{move.title}
			</button>
		</li>
	);
};

export default memo(MoveButton);
