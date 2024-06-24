import { Figure, FigureNames } from './Figure';
import { Colors } from '../Colors';
import { Cell } from '../Cell';
import blackLogo from '../../assets/black-king.svg';
import whiteLogo from '../../assets/white-king.svg';
import { Board } from '../Board';

export class King extends Figure {
	shah: boolean;
	shahFigures: Figure[];
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
		this.name = FigureNames.KING;
		this.shah = false;
		this.shahFigures = [];
	}

	validMove(target: Cell): boolean {
		const dy = target.y - this.cell.y;
		const dx = target.x - this.cell.x;
		const absDy = Math.abs(dy);
		const absDx = Math.abs(dx);

		if (target?.figure?.color === this.color) {
			return false;
		}

		// if (this.cell.board.isCellUnderAttack(target, this.cell)) return false;

		const originalCell = this.cell;
		const originalTargetFigure = target.figure;

		// Временно перемещаем короля на целевую клетку
		this.cell.figure = null;
		target.figure = this;
		this.cell = target;

		const targetUnderAttack = target.board.isCellUnderAttack(target, this.cell);

		// Возвращаем короля на исходную клетку
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

	// moveFigure(target: Cell, board: Board): void {
	// 	// Temporary move to target cell
	// 	const originalCell = this.cell;
	// 	const originalFigure = target.figure;
	// 	this.cell = target;
	// 	target.figure = this;

	// 	// Check for shah
	// 	const isInCheck = this.isCellUnderAttack(target);

	// 	// Undo move
	// 	this.cell = originalCell;
	// 	target.figure = originalFigure;

	// 	if (!isInCheck) {
	// 		// Proceed with the move
	// 		this.cell.figure = null;
	// 		target.figure = this;
	// 		this.cell = target;
	// 	} else {
	// 		console.log('Move not allowed: king would be in check.');
	// 	}
	// }
}
