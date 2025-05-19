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

export const useSelected = (
	board: Board,
	setBoard: (board: Board) => void,
	imgForMove: HTMLImageElement | null,
): UseSelectedHook => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
	// console.log(imgForMove?.style);
	// if (imgForMove) {
	// 	imgForMove.style.position = 'absolute';
	// 	imgForMove.style.left = '500px';
	// }

	async function moveElementSlow(element: HTMLImageElement, targetElement: HTMLDivElement): Promise<void> {
		const targetRect = targetElement.getBoundingClientRect();
		const elementRect = element.getBoundingClientRect();
		const deltaY = targetRect.top - elementRect.top;
		const deltaX = targetRect.left - elementRect.left;
		element.style.transition = `transform 0.4s ease-out`;
		element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
		const waitAnimPromise = new Promise(resolve => {
			setTimeout(() => {
				resolve(true);
			}, 300);
		});
		await waitAnimPromise;
	}

	function updateBoard() {
		const newBoard = board.getCopyBoard();
		setBoard(newBoard);
	}
	async function selectHandler(cell: Cell, isDragging?: boolean, cellElement?: HTMLDivElement | null) {
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
			if (imgForMove && cellElement) {
				await moveElementSlow(imgForMove, cellElement);
			}
			selectedCell.moveFigure(cell, board);
		} else {
			setSelectedCell(null);
		}

		updateBoard();
	}

	return { selectedCell, setSelectedCell, selectHandler, updateBoard };
};
