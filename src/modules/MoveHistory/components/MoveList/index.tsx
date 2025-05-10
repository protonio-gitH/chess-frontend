import React, { FC, memo } from 'react';
import styles from './index.module.scss';
import { Move } from '../../types/moveTypes';

interface MoveListProps {
	whiteMoves: Move[];
	blackMoves: Move[];
	handleMoveClick: (move: Move) => void;
}

const MoveList: FC<MoveListProps> = ({ whiteMoves, blackMoves, handleMoveClick }) => {
	return (
		<div className={styles.moveList}>
			<ul className={styles.moveList__list}>
				{whiteMoves.map((move, i) => (
					<li className={styles['moveList__list-item']} key={i}>
						<button onClick={() => handleMoveClick(move)}>{move.title}</button>
					</li>
				))}
			</ul>
			<ul className={styles.moveList__list}>
				{blackMoves.map((move, i) => (
					<li className={styles['moveList__list-item']} key={i}>
						<button onClick={() => handleMoveClick(move)}>{move.title}</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default memo(MoveList);
