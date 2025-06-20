import React, { FC, memo } from 'react';
import styles from './index.module.scss';
import { Move, HandleMoveClick } from '../../types/moveTypes';
import MoveColumn from '../MoveColumn';
import MoveControls from '../MoveControls';

interface MoveListProps {
	whiteMoves: Move[];
	blackMoves: Move[];
	handleMoveClick: HandleMoveClick;
}

const MoveList: FC<MoveListProps> = ({ whiteMoves, blackMoves, handleMoveClick }) => {
	return (
		<div className={styles.moveList}>
			{(whiteMoves.length > 0 || blackMoves.length > 0) && <MoveControls />}
			<div className={styles.moveList__columns}>
				<MoveColumn moves={whiteMoves} handleMoveClick={handleMoveClick} />
				<MoveColumn moves={blackMoves} handleMoveClick={handleMoveClick} />
			</div>
		</div>
	);
};

export default memo(MoveList);
