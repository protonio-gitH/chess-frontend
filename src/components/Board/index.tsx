import React, { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Board } from '../../models/Board';
import CellComponent from '../Cell';
import { Cell } from '../../models/Cell';
import { useSelected } from '../../hooks/useSelected';

interface BoardProps {
	board: Board;
	setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
	const [selectedCell, selectHandler, updateBoard] = useSelected(board, setBoard);

	function hightlightCells() {
		board.hightlightCells(selectedCell);
		updateBoard();
	}

	useEffect(() => {
		hightlightCells();
	}, [selectedCell]);
	return (
		<div className={styles.board}>
			{board.cells.map((row, i) => (
				<React.Fragment key={i}>
					{row.map(cell => (
						<CellComponent
							key={cell.id}
							cell={cell}
							selectHandler={selectHandler}
							selected={
								selectedCell?.x === cell.x && selectedCell?.y === cell.y && selectedCell.figure?.color == board.move
							}
							board={board}
						/>
					))}
				</React.Fragment>
			))}
		</div>
	);
};

export default BoardComponent;
