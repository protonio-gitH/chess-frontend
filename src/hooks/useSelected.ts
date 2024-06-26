import { useEffect, useState } from 'react';
import { Cell } from '../models/Cell';
import { Board } from '../models/Board';
import { Colors } from '../models/Colors';

type UseSelectedHook = [Cell | null, (cell: Cell) => void, () => void];

export const useSelected = (board: Board, setBoard: (board: Board) => void): UseSelectedHook => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

	function updateBoard() {
		const newBoard = board.getCopyBoard();
		setBoard(newBoard);
	}
	function selectHandler(cell: Cell) {
		// console.log('Clicked cell:', cell);

		if (cell.figure && cell.figure.color === board.move) {
			setSelectedCell(cell);
		}
		// else if (cell?.x === selectedCell?.x && cell?.y === selectedCell?.y && cell.figure) {
		// 	setSelectedCell(null);
		else if (selectedCell && selectedCell.figure?.canMove(cell)) {
			setSelectedCell(null);
			selectedCell.moveFigure(cell, board);
			console.log(selectedCell);
		} else {
			setSelectedCell(null);
		}
		updateBoard();
	}

	return [selectedCell, selectHandler, updateBoard];
};
