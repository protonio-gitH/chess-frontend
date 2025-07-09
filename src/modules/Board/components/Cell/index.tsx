import React, { FC, useEffect, useRef, useState, memo, forwardRef } from 'react';
import styles from './index.module.scss';
import { Cell } from '../../models/Cell';
import { Board } from '../../models/Board';
import { useFigureDrag } from '../../hooks/useFigureDrag';
import { CellSelectHandler } from '../../types/useFigureDragTypes';
import { FigureNames } from '../../constants/FigureNames';
import { King } from '../../models/figures/King';
import PromotionPawn from '../PromotionPawn';

interface CellProps {
	cell: Cell;
	selectHandler: CellSelectHandler;
	selected: boolean;
	board: Board;
	updateBoard: () => void;
}

function getClassNames(cell: Cell, selected: boolean, board: Board): string {
	const baseClass = styles.cell;
	const availableClass = cell?.available && cell.figure ? styles['attacked-' + cell.color] : '';
	const colorClass = styles[cell.color];
	const selectedClass = selected ? styles.selected : '';
	const shahClass = cell.figure instanceof King && cell.figure?.shah ? styles['shah-' + cell.color] : '';
	const shahSelectedClass =
		cell.figure instanceof King && cell.figure?.shah && selected ? styles['shah-selected-' + cell.color] : '';
	const selectedFromMoveClass =
		cell.x === board.fromCell?.x && cell.y === board.fromCell?.y ? styles['selected-from-move'] : '';
	const selectedToMoveClass =
		cell.x === board.toCell?.x && cell.y === board.toCell?.y ? styles['selected-to-move'] : '';

	return [
		baseClass,
		availableClass,
		colorClass,
		selectedClass,
		shahClass,
		shahSelectedClass,
		selectedFromMoveClass,
		selectedToMoveClass,
	]
		.filter(Boolean)
		.join(' ');
}

const CellComponent = forwardRef<HTMLImageElement, CellProps>(
	({ cell, selectHandler, selected, board, updateBoard }, ref) => {
		const { mouseDownHandler } = useFigureDrag(cell, selectHandler, selected, board);
		let classNames = getClassNames(cell, selected, board);

		return (
			<>
				<div
					className={classNames}
					onMouseDown={e => mouseDownHandler(e, cell)}
					onDragStart={e => e.preventDefault()}
					data-x={cell.x}
					data-y={cell.y}
					data-file={cell.file}
				>
					{cell?.available && !cell.figure && <div className={styles.available}></div>}
					{cell.figure?.logo && <img ref={ref} src={cell.figure?.logo} />}
					{/* <use href={logo} /> */}
					{/* <img ref={ref} src={cell.figure?.logo} /> */}
				</div>
				{(cell.y === 0 || cell.y === 7) && cell.figure?.name === FigureNames.PAWN && (
					<PromotionPawn cell={cell} updateBoard={updateBoard} board={board} />
				)}
			</>
		);
	},
);

export default memo(CellComponent);
