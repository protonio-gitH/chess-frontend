import { useEffect, useState } from 'react';
import { Cell } from '../models/Cell';
import { Board } from '../models/Board';
import { Colors } from '../constants/Colors';
import { CellSelectHandler } from '../types/useFigureDragTypes';
import { King } from '../models/figures/King';
import { Rook } from '../models/figures/Rook';

type UseSelectedHook = {
	selectedCell: Cell | null;
	setSelectedCell: (cell: Cell | null) => void;
	selectHandler: CellSelectHandler;
	updateBoard: () => void;
};

export const useSelected = (board: Board, setBoard: (board: Board) => void): UseSelectedHook => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

	function updateBoard() {
		const newBoard = board.getCopyBoard();
		// if (newBoard.promotion) newBoard.changePromotion();
		setBoard(newBoard);
	}
	function selectHandler(cell: Cell, isDragging?: boolean) {
		if (cell?.figure && cell.figure.color === board.move && !board.promotion) {
			if (cell?.x === selectedCell?.x && cell?.y === selectedCell?.y && !isDragging) {
				setSelectedCell(null);
			} else {
				if (
					selectedCell?.figure instanceof King &&
					selectedCell.figure.castling &&
					cell.figure instanceof Rook &&
					cell.figure.castling
				) {
					setSelectedCell(null);
					selectedCell.moveFigure(cell, board);
				} else {
					setSelectedCell(cell);
				}
			}
		} else if (selectedCell && selectedCell.figure?.canMove(cell) && !board.promotion) {
			setSelectedCell(null);
			selectedCell.moveFigure(cell, board);
		} else {
			setSelectedCell(null);
		}

		updateBoard();
	}

	return { selectedCell, setSelectedCell, selectHandler, updateBoard };
};
