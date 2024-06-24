import blackLogo from '../../assets/black-rook.svg';
import whiteLogo from '../../assets/white-rook.svg';
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure, FigureNames } from './Figure';

export class Rook extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
		this.name = FigureNames.ROOK;
	}

	public validMove(target: Cell): boolean {
		const isWhite = this.cell.figure?.color === Colors.WHITE;
		const isBlack = this.cell.figure?.color === Colors.BLACK;

		if (target?.figure?.color === this.cell.figure?.color) {
			return false;
		}

		const dx = target.x - this.cell.x;
		const dy = target.y - this.cell.y;

		if (Math.abs(dx) > 0 && Math.abs(dy) > 0) return false;

		const stepX = dx !== 0 ? (dx > 0 ? 1 : -1) : 0;
		const stepY = dy !== 0 ? (dy > 0 ? 1 : -1) : 0;

		let x = this.cell.x + stepX;
		let y = this.cell.y + stepY;

		while (x !== target.x || y !== target.y) {
			const cell = this.cell.board.getCell(x, y);

			if (cell.figure) {
				return false;
			}

			x += stepX;
			y += stepY;
		}

		return true;
	}
}
