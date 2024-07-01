import { useEffect, useState } from 'react';
import { Cell } from '../models/Cell';
import { Board } from '../models/Board';
import { Colors } from '../models/Colors';
import { CellSelectHandler } from '../types/useFigureDragTypes';

type UseSelectedHook = [Cell | null, (cell: Cell | null) => void, CellSelectHandler, () => void];

export const useSelected = (board: Board, setBoard: (board: Board) => void): UseSelectedHook => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

	function updateBoard() {
		const newBoard = board.getCopyBoard();
		setBoard(newBoard);
	}
	function selectHandler(cell: Cell) {
		// console.log('Clicked cell:', cell);

		if (cell?.figure && cell.figure.color === board.move) {
			if (cell?.x === selectedCell?.x && cell?.y === selectedCell?.y) {
				setSelectedCell(null);
			} else {
				setSelectedCell(cell);
			}
		} else if (selectedCell && selectedCell.figure?.canMove(cell)) {
			setSelectedCell(null);
			selectedCell.moveFigure(cell, board);
		} else {
			setSelectedCell(null);
		}

		updateBoard();
	}

	return [selectedCell, setSelectedCell, selectHandler, updateBoard];
};
