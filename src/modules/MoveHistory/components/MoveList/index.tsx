import React, { FC, memo, useEffect } from 'react';
import styles from './index.module.scss';
import { Move, HandleMoveClick } from '../../types/moveTypes';
import MoveColumn from '../MoveColumn';
import MoveControls from '../MoveControls';

interface MoveListProps {
	whiteMoves: Move[];
	blackMoves: Move[];
	handleMoveClick: HandleMoveClick;
	currentMove: Move | null;
	handleContolBtnClick: (action: 'first' | 'next' | 'prev' | 'last') => void;
}

const MoveList: FC<MoveListProps> = ({
	whiteMoves,
	blackMoves,
	handleMoveClick,
	currentMove,
	handleContolBtnClick,
}) => {
	return (
		<div className={styles.moveList}>
			{(whiteMoves.length > 0 || blackMoves.length > 0) && <MoveControls handleContolBtnClick={handleContolBtnClick} />}
			<div className={styles.moveList__columns}>
				<MoveColumn moves={whiteMoves} handleMoveClick={handleMoveClick} currentMove={currentMove} />
				<MoveColumn moves={blackMoves} handleMoveClick={handleMoveClick} currentMove={currentMove} />
			</div>
		</div>
	);
};

export default memo(MoveList);
