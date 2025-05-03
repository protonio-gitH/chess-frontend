import React, { FC, memo } from 'react';
import styles from './index.module.scss';
import { Move } from '../../types/moveTypes';

interface MoveListProps {
	whiteMoves: Move[];
	blackMoves: Move[];
}

const MoveList: FC<MoveListProps> = ({ whiteMoves, blackMoves }) => {
	return (
		<div className={styles.moveList}>
			<ul>
				{whiteMoves.map((move, i) => (
					<li key={i}>{move.title}</li>
				))}
			</ul>
			<ul>
				{blackMoves.map((move, i) => (
					<li key={i}>{move.title}</li>
				))}
			</ul>
		</div>
	);
};

export default memo(MoveList);
