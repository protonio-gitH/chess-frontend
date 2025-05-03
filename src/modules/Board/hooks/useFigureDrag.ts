import { useEffect, useState, useRef } from 'react';
import { Cell } from '../models/Cell';
import { Board } from '../models/Board';
import { CellSelectHandler } from '../types/useFigureDragTypes';

type useFigureDragHook = {
	mouseDownHandler: (e: React.MouseEvent<HTMLDivElement>, cell: Cell) => void;
};

export function useFigureDrag(
	cell: Cell,
	selectHandler: CellSelectHandler,
	selected: boolean,
	board: Board,
): useFigureDragHook {
	const [dragging, setDragging] = useState<boolean>(false);
	const [draggedElement, setDraggedElement] = useState<HTMLElement | null>(null);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [mouseDownTime, setMouseDownTime] = useState<number>(0);
	const [element, setElement] = useState<HTMLElement | null>(null);
	const timer = useRef<NodeJS.Timeout | null>(null);

	const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>, cell: Cell): void => {
		const target = e.target as HTMLElement;
		setElement(target);
		selectHandler(cell);
		if (cell.figure && target.tagName === 'IMG' && cell.figure?.color == board.move) {
			timer.current = setInterval(() => {
				setMouseDownTime(prev => prev + 1);
			}, 10);
			// setDraggedElement(target);
			setDragging(true);
		}
	};

	const mouseMoveHandler = (e: MouseEvent): void => {
		if (dragging && draggedElement) {
			setIsDragging(true);
			selectHandler(cell, true);
			draggedElement.style.position = 'fixed';
			draggedElement.style.left = `${e.clientX - draggedElement.offsetWidth / 2}px`;
			draggedElement.style.top = `${e.clientY - draggedElement.offsetHeight / 2}px`;
		}
	};

	const mouseUpHandler = (e: MouseEvent): void => {
		if (timer.current) {
			clearInterval(timer.current);
			timer.current = null;
			setMouseDownTime(0);
		}
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
				// selectHandler(cell);
			}
			setDraggedElement(null);
			setIsDragging(false);
		}
	};

	useEffect(() => {
		if (mouseDownTime === 5) {
			setDraggedElement(element);
		}
	}, [mouseDownTime]);

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
	}, [dragging, isDragging, mouseDownTime]);

	return { mouseDownHandler } as useFigureDragHook;
}
