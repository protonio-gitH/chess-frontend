import { Board } from './Board';
import { Colors } from './Colors';
import { Figure, FigureNames } from './figures/Figure';
import { King } from './figures/King';

export class Cell {
	readonly x: number;
	readonly y: number;
	readonly color: Colors;
	figure: Figure | null;
	available: boolean;
	id: number;
	board: Board;

	constructor(x: number, y: number, color: Colors, figure: Figure | null, board: Board) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.figure = figure;
		this.available = false;
		this.id = Math.random();
		this.board = board;
	}

	private checkKingShah(board: Board): void {
		for (let i = 0; i < board.cells.length; i++) {
			const row = board.cells[i];
			for (let j = 0; j < row.length; j++) {
				const cell = row[j];
				cell.figure?.checkKingShah();
			}
		}
	}

	public moveFigure(target: Cell, board: Board): void {
		if (this.figure?.color === board.move) {
			if (this.figure && this.figure?.validMove(target) && target.figure?.name !== FigureNames.KING) {
				// this.figure.moveFigure(target);
				if (this.figure.name === FigureNames.KING) {
					const king = this.figure as King;
					king.shahFigures = king.shahFigures.filter(i => i.id !== target.figure?.id);
				}

				if (target.figure) {
					const king = board.getKing(target.figure.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE);

					if (king?.shahFigures.some(i => i.id === target.figure?.id)) {
						king.shahFigures = king.shahFigures.filter(i => i.id !== target.figure?.id);
					}
				}

				target.figure = this.figure;
				target.figure.cell = target;

				this.figure = null;
				board.changeMoveColor();
				this.checkKingShah(board);
			}
		}
	}
}
