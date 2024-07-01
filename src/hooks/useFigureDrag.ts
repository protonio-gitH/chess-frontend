import { useEffect, useState } from 'react';
import { Cell } from '../models/Cell';
import { Board } from '../models/Board';
import { CellSelectHandler } from '../types/useFigureDragTypes';

type useFigureDragHook = [(e: React.MouseEvent<HTMLDivElement>, cell: Cell) => void];

export function useFifgureDrag(
	cell: Cell,
	selectHandler: CellSelectHandler,
	selected: boolean,
	board: Board,
): useFigureDragHook {
	const [dragging, setDragging] = useState<boolean>(false);
	const [draggedElement, setDraggedElement] = useState<HTMLElement | null>(null);
	const [isDragging, setIsDragging] = useState<boolean>(false);

	const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>, cell: Cell): void => {
		selectHandler(cell);
		const target = e.target as HTMLElement;
		if (cell.figure && target.tagName === 'IMG' && cell.figure?.color == board.move) {
			setDragging(true);
			setDraggedElement(target);
		}
	};

	const mouseMoveHandler = (e: MouseEvent): void => {
		if (dragging && draggedElement) {
			setIsDragging(true);
			draggedElement.style.position = 'fixed';
			draggedElement.style.left = `${e.clientX - draggedElement.offsetWidth / 2}px`;
			draggedElement.style.top = `${e.clientY - draggedElement.offsetHeight / 2}px`;
		}
	};

	const mouseUpHandler = (e: MouseEvent): void => {
		if (dragging) {
			setDragging(false);
			if (draggedElement) {
				const dropTargets = document.elementsFromPoint(e.clientX, e.clientY);
				let dropElem = null;
				for (let elem of dropTargets) {
					if (elem instanceof HTMLElement && elem.dataset.x && elem.dataset.y) {
						dropElem = elem;
						break;
					}
				}
				if (dropElem) {
					const targetCell = board.getCell(Number(dropElem.dataset.x), Number(dropElem.dataset.y));
					cell.moveFigure(targetCell, board);
				}
				if (isDragging) {
					selectHandler(cell);
				}
				draggedElement.style.position = '';
				draggedElement.style.left = '';
				draggedElement.style.top = '';
			}
			setDraggedElement(null);
			setIsDragging(false);
		}
	};

	useEffect(() => {
		if (dragging) {
			window.addEventListener('mousemove', mouseMoveHandler);
			window.addEventListener('mouseup', mouseUpHandler);
		} else {
			setIsDragging(false);
			window.removeEventListener('mousemove', mouseMoveHandler);
			window.removeEventListener('mouseup', mouseUpHandler);
		}

		return () => {
			window.removeEventListener('mousemove', mouseMoveHandler);
			window.removeEventListener('mouseup', mouseUpHandler);
		};
	}, [dragging, isDragging]);

	return [mouseDownHandler] as useFigureDragHook;
}
