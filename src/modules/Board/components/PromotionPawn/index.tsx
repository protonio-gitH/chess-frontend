import React, { FC, useEffect, useRef, useState, memo } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.scss';
import whiteQueen from '../../assets/figures/white-queen.svg';
import blackQueen from '../../assets/figures/black-queen.svg';
import whiteRook from '../../assets/figures/white-rook.svg';
import blackRook from '../../assets/figures/black-rook.svg';
import whiteKnight from '../../assets/figures/white-knight.svg';
import blackKnight from '../../assets/figures/black-knight.svg';
import whiteBishop from '../../assets/figures/white-bishop.svg';
import blackBishop from '../../assets/figures/black-bishop.svg';
import { Cell } from '../../models/Cell';
import { Colors } from '../../constants/Colors';
import { NewFigures } from '../../types/newFigureTypes';
import { Board } from '../../models/Board';

interface PromotionPawnProps {
	cell: Cell;
	updateBoard: () => void;
	board: Board;
}

const PromotionPawn: FC<PromotionPawnProps> = function ({ cell, updateBoard, board }) {
	const [open, setOpen] = useState<boolean>(true);
	const [position, setPosition] = useState<{
		top: number;
		left: number;
		height: number;
		promRefHeight: number;
	}>({
		top: 0,
		left: 0,
		height: 0,
		promRefHeight: 0,
	});
	const promotionRef = useRef<HTMLDivElement>(null);

	const updatePosition = () => {
		const cellElement = document.querySelector(`[data-x='${cell.x}'][data-y='${cell.y}']`) as HTMLElement | null;
		const cellRect = cellElement?.getBoundingClientRect() as DOMRect;
		if (cellRect) {
			setPosition({
				top: cellRect.top,
				left: cellRect.left,
				height: cellRect.height,
				promRefHeight: promotionRef.current?.getBoundingClientRect().height ?? 0,
			});
		}
	};

	useEffect(() => {
		updatePosition();
	}, [cell]);

	useEffect(() => {
		window.addEventListener('resize', updatePosition);
		return () => window.removeEventListener('resize', updatePosition);
	}, []);

	if (!open) {
		return null;
	}

	const cellPositionStyle = {
		top: `${position.top + (cell.y === 0 ? -position.promRefHeight : position.height)}px`,
		left: `${position.left}px`,
	};

	function cancelHanler() {
		board.changePromotion();
		setOpen(false);
	}

	function changeHandler(e: React.MouseEvent<HTMLLIElement | HTMLUListElement>) {
		const target = e.target as HTMLElement;
		const altText = target.getAttribute('alt') as keyof NewFigures;
		cell.promotionLogic(altText);
		board.changePromotion();
		updateBoard();
	}
	return (
		<div ref={promotionRef} className={styles.promotion} style={cellPositionStyle}>
			<ul onClick={changeHandler}>
				<li className={styles['promotion__list-item']}>
					<img src={cell.figure?.color === Colors.WHITE ? whiteQueen : blackQueen} alt="Queen" />
				</li>
				<li className={styles['promotion__list-item']}>
					<img src={cell.figure?.color === Colors.WHITE ? whiteRook : blackRook} alt="Rook" />
				</li>
				<li className={styles['promotion__list-item']}>
					<img src={cell.figure?.color === Colors.WHITE ? whiteKnight : blackKnight} alt="Knight" />
				</li>
				<li className={styles['promotion__list-item']}>
					<img src={cell.figure?.color === Colors.WHITE ? whiteBishop : blackBishop} alt="Bishop" />
				</li>
			</ul>
			<button onClick={cancelHanler}>
				<div className={styles.cross}>
					<span></span>
					<span></span>
				</div>
			</button>
		</div>
	);
};

export default memo(PromotionPawn);
