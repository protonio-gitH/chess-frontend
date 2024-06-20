import logo from '../../assets/black-bishop.svg';
import { Cell } from '../Cell';
import { Colors } from '../Colors';

export enum FigureNames {
	FIGURE = 'Фигура',
	KING = 'Король',
	KNIGHT = 'Конь',
	PAWN = 'Пешка',
	QUEEN = 'Ферзь',
	BISHOP = 'Слон',
	ROOK = 'Ладья',
}

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

	public canMove(target: Cell): boolean {
		// if (target?.figure?.color === this.color || target?.figure?.name == FigureNames.KING) {
		// 	return false;
		// }
		return true;
	}
}
