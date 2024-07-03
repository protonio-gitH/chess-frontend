import { Figure } from './Figure';
import { FigureNames } from '../FigureNames';
import { Colors } from '../Colors';
import { Cell } from '../Cell';
import blackLogo from '../../assets/black-king.svg';
import whiteLogo from '../../assets/white-king.svg';

export class King extends Figure {
	shah: boolean;
	shahFigures: Figure[];
	stalemate: boolean;
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
		this.name = FigureNames.KING;
		this.shah = false;
		this.shahFigures = [];
		this.stalemate = false;
	}

	public validMove(target: Cell): boolean {
		const dy = target.y - this.cell.y;
		const dx = target.x - this.cell.x;
		const absDy = Math.abs(dy);
		const absDx = Math.abs(dx);

		if (target?.figure?.color === this.color) {
			return false;
		}

		// if (this.cell.board.isCellUnderAttack(target, this.cell)) return false;
		//если king.shah и никто не может схавать шах фигуру то мат.
		const originalCell = this.cell;
		const originalTargetFigure = target.figure;

		this.cell.figure = null;
		target.figure = this;
		this.cell = target;

		const targetUnderAttack = target.board.isCellUnderAttack(target, this.cell);

		this.cell = originalCell;
		originalCell.figure = this;
		target.figure = originalTargetFigure;

		if (targetUnderAttack) {
			return false;
		}

		if (absDx > 1) return false;
		else if (absDy > 1) return false;
		return true;
	}
}
