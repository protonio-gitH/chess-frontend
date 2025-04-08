import React, { FC, useEffect, useRef, useState, memo } from 'react';
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

function getClassNames(cell: Cell, selected: boolean): string {
	const baseClass = styles.cell;
	const availableClass = cell?.available && cell.figure ? styles['attacked-' + cell.color] : '';
	const colorClass = styles[cell.color];
	const selectedClass = selected ? styles.selected : '';
	const shahClass = cell.figure instanceof King && cell.figure?.shah ? styles['shah-' + cell.color] : '';
	const shahSelectedClass =
		cell.figure instanceof King && cell.figure?.shah && selected ? styles['shah-selected-' + cell.color] : '';

	return [baseClass, availableClass, colorClass, selectedClass, shahClass, shahSelectedClass].filter(Boolean).join(' ');
}

const CellComponent: FC<CellProps> = ({ cell, selectHandler, selected, board, updateBoard }) => {
	const [mouseDownHandler] = useFigureDrag(cell, selectHandler, selected, board);
	let classNames = getClassNames(cell, selected);

	return (
		<>
			<div
				className={classNames}
				onMouseDown={e => mouseDownHandler(e, cell)}
				onDragStart={e => e.preventDefault()}
				data-x={cell.x}
				data-y={cell.y}
			>
				{cell?.available && !cell.figure && <div className={styles.available}></div>}
				{cell.figure?.logo && <img src={cell.figure?.logo} />}
			</div>
			{(cell.y === 0 || cell.y === 7) && cell.figure?.name === FigureNames.PAWN && (
				<PromotionPawn cell={cell} updateBoard={updateBoard} board={board} />
			)}
		</>
	);
};

export default CellComponent;
