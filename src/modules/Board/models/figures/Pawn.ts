import { Figure } from './Figure';
import { Colors } from '../../../../constants';
import { FigureNames } from '../../constants/';
import { Cell } from '../Cell';
import blackLogo from '../../assets/figures/black-pawn.svg';
import whiteLogo from '../../assets/figures/white-pawn.svg';

export class Pawn extends Figure {
	enPassant: boolean;
	enPassantCell: Cell | null;
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
		this.name = FigureNames.PAWN;
		this.enPassant = false;
		this.enPassantCell = null;
	}

	protected validMove(target: Cell, forKing?: boolean): boolean {
		const isWhite = this.cell.figure?.color === Colors.WHITE;
		const isBlack = this.cell.figure?.color === Colors.BLACK;
		const direction = isWhite ? 1 : -1;
		const startRow = isWhite ? 1 : 6;
		const dy = target.y - this.cell.y;
		const dx = target.x - this.cell.x;
		const absDy = Math.abs(dy);
		const absDx = Math.abs(dx);

		if (forKing) {
			if (absDx === 0 || absDx > 1) {
				return false;
			}
			if (absDy === 1 && dy === direction) {
				return true;
			}
			return false;
		}

		if (target.x === this.enPassantCell?.x && target.y === this.enPassantCell?.y) {
			return true;
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
