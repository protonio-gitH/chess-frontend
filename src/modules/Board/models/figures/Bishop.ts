import { Cell } from '../Cell';
import { Colors } from '../../constants/Colors';
import { Figure } from './Figure';
import { FigureNames } from '../../constants/FigureNames';
import blackLogo from '../../assets/figures/black-bishop.svg';
import whiteLogo from '../../assets/figures/white-bishop.svg';

export class Bishop extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
		this.name = FigureNames.BISHOP;
	}

	protected validMove(target: Cell): boolean {
		const isWhite = this.cell.figure?.color === Colors.WHITE;
		const isBlack = this.cell.figure?.color === Colors.BLACK;

		if (target?.figure?.color === this.cell.figure?.color) {
			return false;
		}

		const dx = target.x - this.cell.x;
		const dy = target.y - this.cell.y;

		if (Math.abs(dx) !== Math.abs(dy)) {
			return false;
		}

		const stepX = dx > 0 ? 1 : -1;
		const stepY = dy > 0 ? 1 : -1;

		let x = this.cell.x + stepX;
		let y = this.cell.y + stepY;

		while (x !== target.x && y !== target.y) {
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
