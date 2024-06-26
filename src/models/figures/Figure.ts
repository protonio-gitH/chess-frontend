import logo from '../../assets/black-bishop.svg';
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { King } from './King';
import { FigureNames } from '../FigureNames';

export class Figure {
	color: Colors;
	logo: typeof logo | null;
	cell: Cell;
	name: FigureNames;
	id: number;

	constructor(color: Colors, cell: Cell) {
		this.color = color;
		this.cell = cell;
		this.cell.figure = this;
		this.logo = null;
		this.name = FigureNames.FIGURE;
		this.id = Math.random();
	}

	public checkKingShah(): void {
		const enemyKing = this.cell.board.getKing(this.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE);

		if (!enemyKing) return;

		if (this.canMove(enemyKing.cell)) {
			if (enemyKing.shahFigures.filter(i => i.id === this.id).length === 0) {
				enemyKing.shahFigures = [...enemyKing.shahFigures, this];
			}
		} else {
			enemyKing.shahFigures = enemyKing.shahFigures.filter(i => i.id !== this.id);
		}

		if (enemyKing.shahFigures.length !== 0) {
			enemyKing.shah = true;
		} else {
			enemyKing.shah = false;
		}
	}

	public canMove(target: Cell, forKing?: boolean): boolean {
		const allyKing = this.cell.board.getKing(this.color) as King;

		if (allyKing?.shah) {
			if (allyKing.shahFigures.length === 1) {
				const shahFigure = allyKing.shahFigures[0] as Figure;
				if (this.validMove(shahFigure.cell) && target.x === shahFigure.cell.x && target.y === shahFigure.cell.y) {
					return true;
				} else if (this.name !== FigureNames.KING) {
					const queenOrRook = shahFigure.name === FigureNames.QUEEN || shahFigure.name === FigureNames.ROOK;
					const queenOrBishop = shahFigure.name === FigureNames.QUEEN || shahFigure.name === FigureNames.BISHOP;
					if (queenOrRook && shahFigure.cell.x === allyKing.cell.x) {
						return this.isQueenOrRookShahStraightMove(shahFigure, this.cell, target, allyKing);
					} else if (queenOrBishop && shahFigure.cell.x !== allyKing.cell.x && shahFigure.cell.y !== allyKing.cell.y) {
						return this.isBishopOrQueenShahDiagonalMove(shahFigure, this.cell, target, allyKing);
					}
				} else {
					return forKing ? this.validMove(target, forKing) : this.validMove(target);
				}
			}
			return false;
		}

		return forKing ? this.validMove(target, forKing) : this.validMove(target);
	}

	private isQueenOrRookShahStraightMove(shahFigure: Figure, selfCell: Cell, target: Cell, allyKing: King): boolean {
		const dy = shahFigure.cell.y < allyKing.cell.y ? 1 : -1;

		let y = shahFigure.cell.y;

		while (y !== allyKing.cell.y) {
			y += dy;
			const validCell = this.cell.board.getCell(shahFigure.cell.x, y);
			if (target.x === validCell.x && target.y === validCell.y && this.validMove(validCell)) {
				return true;
			}
		}

		return false;
	}

	private isBishopOrQueenShahDiagonalMove(shahFigure: Figure, selfCell: Cell, target: Cell, allyKing: King): boolean {
		const dx = shahFigure.cell.x < allyKing.cell.x ? 1 : -1;
		const dy = shahFigure.cell.y < allyKing.cell.y ? 1 : -1;

		let x = shahFigure.cell.x;
		let y = shahFigure.cell.y;

		while (x !== allyKing.cell.x && y !== allyKing.cell.y) {
			x += dx;
			y += dy;
			const validCell = this.cell.board.getCell(x, y);

			if (target.x === validCell.x && target.y === validCell.y && this.validMove(validCell)) {
				return true;
			}
		}

		return false;
	}

	public validMove(target: Cell, forKing?: boolean): boolean {
		return true;
	}
}
