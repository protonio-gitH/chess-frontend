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

	async function moveElementSlow(element: HTMLImageElement, targetElement: HTMLDivElement): Promise<void> {
		const targetRect = targetElement.getBoundingClientRect();
		const elementRect = element.getBoundingClientRect();
		const deltaY = targetRect.top - elementRect.top;
		const deltaX = targetRect.left - elementRect.left;
		const sqrAnimTiming = deltaX ** 2 + deltaY ** 2;
		const sqrtAnimTiming = Math.sqrt(sqrAnimTiming);
		element.style.transition = `transform ${sqrtAnimTiming}ms ease-out`;
		element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
		const waitAnimPromise = new Promise<void>(resolve => {
			setTimeout(() => {
				resolve();
			}, sqrtAnimTiming);
		});
		await waitAnimPromise;
	}

	function updateBoard(): void {
		const newBoard = board.getCopyBoard();
		setBoard(newBoard);
	}
	async function selectHandler(cell: Cell, isDragging?: boolean, cellElement?: HTMLDivElement | null): Promise<void> {
		const lastMove = board.moveHistory.getLastMove();
		const currentMove = board.moveHistory.getCurrentMove();
		const canMove =
			currentMove === null || currentMove?.title === lastMove?.title || (currentMove === null && lastMove === null)
				? true
				: false;
		console.log(canMove);

		if (cell?.figure && cell.figure.color === board.move && !board.promotion && canMove) {
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
					board.moveHistory.setCurrentMove(board.moveHistory.getLastMove());
				} else {
					setSelectedCell(cell);
				}
			}
		} else if (selectedCell && selectedCell.figure?.canMove(cell) && !board.promotion && canMove) {
			setSelectedCell(null);
			if (imgForMove && cellElement) {
				await moveElementSlow(imgForMove, cellElement);
			}
			selectedCell.moveFigure(cell, board);
			board.moveHistory.setCurrentMove(board.moveHistory.getLastMove());
		} else {
			setSelectedCell(null);
		}

		updateBoard();
	}

	return { selectedCell, setSelectedCell, selectHandler, updateBoard };
};
