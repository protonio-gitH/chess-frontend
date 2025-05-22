import logo from '../../figures/assets/black-bishop.svg';
import { Cell } from '../Cell';
import { King } from './King';
import { Colors } from '../../constants/Colors';
import { FigureNames } from '../../constants/FigureNames';

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
		const enemyKing = this.cell.board.getKing(this.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE) as King;

		if (!enemyKing) return;

		if (this.canMove(enemyKing.cell)) {
			// console.log(this.cell);
			if (enemyKing.shahFigures.filter(i => i.id === this.id).length === 0) {
				enemyKing.shahFigures = [...enemyKing.shahFigures, this];
			}
		} else {
			enemyKing.shahFigures = enemyKing.shahFigures.filter(i => i.id !== this.id);
		}

		if (enemyKing.shahFigures.length !== 0) {
			// console.log(enemyKing.shahFigures);
			enemyKing.shah = true;
			enemyKing.castling = false;
		} else {
			enemyKing.shah = false;
		}
	}

	// public checkKingStalemate(king: King): void {
	// 	const allyKing = this.cell.board.getKing(this.cell.board.move) as King;

	// 	if (!allyKing) return;

	// 	if (allyKing?.shah) {
	// 		for (let i = 0; i < 8; i++) {
	// 			for (let j = 0; j < 8; j++) {
	// 				const cell = this.cell.board.getCell(j, i) as Cell;
	// 				if (cell.figure?.color === allyKing.color) {
	// 					// console.log(cell);
	// 				}
	// 			}
	// 		}
	// 	}

	// }

	public canMove(target: Cell, forKing?: boolean): boolean {
		const allyKing = this.cell.board.getKing(this.color) as King;

		if (allyKing?.shah) {
			if (allyKing.shahFigures.length !== 0) {
				const shahFigure = allyKing.shahFigures[0] as Figure;
				if (this.validMove(shahFigure.cell) && target.x === shahFigure.cell.x && target.y === shahFigure.cell.y) {
					return true;
				} else if (this.name !== FigureNames.KING) {
					const queenOrRook = shahFigure.name === FigureNames.QUEEN || shahFigure.name === FigureNames.ROOK;
					const queenOrBishop = shahFigure.name === FigureNames.QUEEN || shahFigure.name === FigureNames.BISHOP;

					if (queenOrRook && (shahFigure.cell.x === allyKing.cell.x || shahFigure.cell.y === allyKing.cell.y)) {
						return this.isQueenOrRookShahStraightMove(shahFigure, this.cell, target, allyKing);
					} else if (
						queenOrBishop &&
						Math.abs(shahFigure.cell.x - allyKing.cell.x) === Math.abs(shahFigure.cell.y - allyKing.cell.y)
					) {
						return this.isBishopOrQueenShahDiagonalMove(shahFigure, this.cell, target, allyKing);
					}
				} else {
					return forKing ? this.validMove(target, forKing) : this.validMove(target);
				}
			}
			return false;
		} else {
			const dx = this.cell.x < allyKing?.cell.x ? 1 : -1;
			const dy = this.cell.y < allyKing?.cell.y ? 1 : -1;

			const firstFigureStraightVertical = this.findFirstFigureVertical(this.cell.x, this.cell.y, dy);
			const secondFigureStraightVertical = this.findFirstFigureVertical(this.cell.x, this.cell.y, -dy);

			const firstFigureDiagonal = this.findFirstFigureDiagonal(this.cell.x, this.cell.y, dx, dy);
			const secondFigureDiagonal = this.findFirstFigureDiagonal(this.cell.x, this.cell.y, -dx, -dy);

			const firstFigureStraightHorizontal = this.findFirstFigureHorizontal(this.cell.x, this.cell.y, dx);
			const secondFigureStraightHorizontal = this.findFirstFigureHorizontal(this.cell.x, this.cell.y, -dx);

			const queenOrRookVertical =
				secondFigureStraightVertical?.figure?.name === FigureNames.QUEEN ||
				secondFigureStraightVertical?.figure?.name === FigureNames.ROOK;

			const queenOrRookHorizontal =
				secondFigureStraightHorizontal?.figure?.name === FigureNames.QUEEN ||
				secondFigureStraightHorizontal?.figure?.name === FigureNames.ROOK;

			const queenOrBishop =
				secondFigureDiagonal?.figure?.name === FigureNames.QUEEN ||
				secondFigureDiagonal?.figure?.name === FigureNames.BISHOP;

			if (
				queenOrRookVertical &&
				firstFigureStraightVertical?.figure?.name === FigureNames.KING &&
				secondFigureStraightVertical?.figure?.color !== allyKing?.color
			) {
				if (target.x !== this.cell.x) {
					return false;
				}
			} else if (
				queenOrRookHorizontal &&
				firstFigureStraightHorizontal?.figure?.name === FigureNames.KING &&
				secondFigureStraightHorizontal?.figure?.color !== allyKing?.color
			) {
				if (target.y !== this.cell.y) {
					return false;
				}
			} else if (
				queenOrBishop &&
				firstFigureDiagonal?.figure?.name === FigureNames.KING &&
				secondFigureDiagonal?.figure?.color !== allyKing?.color
			) {
				let x = secondFigureDiagonal.x;
				let y = secondFigureDiagonal.y;
				let dx = allyKing?.cell.x > x ? 1 : -1;
				let dy = allyKing?.cell.y > y ? 1 : -1;

				while (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
					const cell = this.cell.board.getCell(x, y) as Cell;
					if (x === target.x && y === target.y && target.figure?.color !== this.color && this.validMove(target)) {
						return true;
					}
					x += dx;
					y += dy;
				}

				return false;
			}
			return forKing ? this.validMove(target, forKing) : this.validMove(target);
		}
	}

	private findFirstFigureVertical(startX: number, startY: number, dy: number): Cell | null {
		let y = startY;
		while (y >= 0 && y <= 7) {
			y += dy;
			if (y < 0 || y > 7) break;
			const validCell = this.cell.board.getCell(startX, y) as Cell;
			if (validCell.figure) {
				return validCell;
			}
		}
		return null;
	}

	private findFirstFigureDiagonal(startX: number, startY: number, dx: number, dy: number): Cell | null {
		let x = startX;
		let y = startY;
		while (x >= 0 && x <= 7 && y >= 0 && y <= 7) {
			x += dx;
			y += dy;
			if (x < 0 || x > 7 || y < 0 || y > 7) break;
			const validCell = this.cell.board.getCell(x, y) as Cell;
			if (validCell.figure) {
				return validCell;
			}
		}
		return null;
	}

	private findFirstFigureHorizontal(startX: number, startY: number, dx: number): Cell | null {
		let x = startX;
		while (x >= 0 && x <= 7) {
			x += dx;
			if (x < 0 || x > 7) break;
			const validCell = this.cell.board.getCell(x, startY) as Cell;
			if (validCell.figure) {
				return validCell;
			}
		}
		return null;
	}

	private isQueenOrRookShahStraightMove(shahFigure: Figure, selfCell: Cell, target: Cell, allyKing: King): boolean {
		if (shahFigure.cell.x === allyKing.cell.x) {
			const dy = shahFigure.cell.y < allyKing.cell.y ? 1 : -1;
			let y = shahFigure.cell.y;
			while (y !== allyKing.cell.y) {
				y += dy;
				const validCell = this.cell.board.getCell(shahFigure.cell.x, y);
				if (target.x === validCell.x && target.y === validCell.y && this.validMove(validCell)) {
					return true;
				}
			}
		} else if (shahFigure.cell.y === allyKing.cell.y) {
			const dx = shahFigure.cell.x < allyKing.cell.x ? 1 : -1;
			let x = shahFigure.cell.x;
			while (x !== allyKing.cell.x) {
				x += dx;
				const validCell = this.cell.board.getCell(x, shahFigure.cell.y);
				if (target.x === validCell.x && target.y === validCell.y && this.validMove(validCell)) {
					return true;
				}
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

	protected validMove(target: Cell, forKing?: boolean): boolean {
		return true;
	}
}
