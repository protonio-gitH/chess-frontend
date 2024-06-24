import logo from '../../assets/black-bishop.svg';
import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { King } from './King';

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

	public canMove(target: Cell, forKing?: boolean): boolean {
		const allyKing = this.cell.board.getKing(this.color) as King;

		if (allyKing?.shah) {
			// console.log(allyKing.shahFigures);
			if (allyKing.shahFigures.length === 1) {
				if (allyKing.shahFigures[0].name === FigureNames.PAWN) {
					const shahPawnCell = allyKing.shahFigures[0].cell as Cell;
					if (this.validMove(shahPawnCell) && target.x === shahPawnCell.x && target.y === shahPawnCell.y) {
						return true;
					}
				}
			}
			return false;
		}

		return forKing ? this.validMove(target, forKing) : this.validMove(target);
	}

	public validMove(target: Cell, forKing?: boolean): boolean {
		return true;
	}
}
