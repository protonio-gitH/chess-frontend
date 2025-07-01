import { memo, FC } from 'react';
import styles from './index.module.scss';
import MoveButton from '../MoveButton';
import { Move, HandleMoveClick } from '../../types/moveTypes';

interface MoveColumnProps {
	moves: Move[];
	handleMoveClick: HandleMoveClick;
	currentMove: Move | null;
}

const MoveColumn: FC<MoveColumnProps> = ({ moves, handleMoveClick, currentMove }) => {
	return (
		<ul className={styles.moveList__list}>
			{moves.map((move, i) => (
				<MoveButton key={i} move={move} handleMoveClick={handleMoveClick} index={i} currentMove={currentMove} />
			))}
		</ul>
	);
};

export default memo(MoveColumn);
