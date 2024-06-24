import { Figure, FigureNames } from './Figure';
import { Colors } from '../Colors';
import { Cell } from '../Cell';
import blackLogo from '../../assets/black-pawn.svg';
import whiteLogo from '../../assets/white-pawn.svg';

export class Pawn extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
		this.name = FigureNames.PAWN;
	}

	// public canMove(target: Cell, forKing?: boolean): boolean {
	// 	const allyKing = this.cell.board.getKing(this.color);

	// 	if (allyKing?.shah) {
	// 		// console.log(allyKing.shahFigures);
	// 		if (allyKing.shahFigures.length === 1) {
	// 			if (allyKing.shahFigures[0] instanceof Pawn) {
	// 				const shahPawnCell = allyKing.shahFigures[0].cell;
	// 				if (this.validMove(shahPawnCell) && target.x === shahPawnCell.x && target.y === shahPawnCell.y) {
	// 					return true;
	// 				}
	// 			}
	// 		}
	// 		return false;
	// 	}

	// 	if (forKing) return this.validMove(target, forKing);

	// 	return this.validMove(target);
	// }

	public validMove(target: Cell, forKing?: boolean): boolean {
		const isWhite = this.cell.figure?.color === Colors.WHITE;
		const isBlack = this.cell.figure?.color === Colors.BLACK;
		const direction = isWhite ? -1 : 1;
		const startRow = isWhite ? 6 : 1;
		const dy = target.y - this.cell.y;
		const dx = target.x - this.cell.x;
		const absDy = Math.abs(dy);
		const absDx = Math.abs(dx);

		if (target?.figure?.color === this.color) {
			return false;
		}

		if (forKing) {
			if (absDx === 0 || absDx > 1) {
				return false;
			}

			if (absDy === 1) {
				return true;
			}
		}

		if (absDy === 1 && dy === direction && absDx === 1 && target.figure && target.figure.color !== this.color) {
			return true;
		}

		if (dx === 0) {
			if (dy === direction && !target.figure) {
				return true;
			}

			if (
				this.cell.y === startRow &&
				dy === 2 * direction &&
				!target.figure &&
				!this.cell.board.getCell(this.cell.x, this.cell.y + direction).figure
			) {
				return true;
			}
		}

		return false;
	}
}
