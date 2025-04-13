import React, { FC, useEffect, useState, memo } from 'react';
import styles from './index.module.scss';
import { Board } from '../../models/Board';
import CellComponent from '../Cell';
import { useSelected } from '../../hooks/useSelected';
import { Colors } from '../../constants/Colors';
import { King } from '../../models/figures/King';

interface BoardProps {
	board: Board;
	setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
	const [selectedCell, setSelectedCell, selectHandler, updateBoard] = useSelected(board, setBoard);
	const [whiteKing, setWhiteKing] = useState<King | null>(null);
	const [blackKing, setBlackKing] = useState<King | null>(null);

	function hightlightCells() {
		board.hightlightCells(selectedCell);
		updateBoard();
	}
	useEffect(() => {
		setWhiteKing(board.getKing(Colors.WHITE));
		setBlackKing(board.getKing(Colors.BLACK));
	}, [board]);

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
							updateBoard={updateBoard}
						/>
					))}
				</React.Fragment>
			))}
			<div>{(whiteKing?.stalemate && 'Мат белым') || (blackKing?.stalemate && 'Мат черным')}</div>
		</div>
	);
};

export default memo(BoardComponent);
