import { Board } from './Board';
import { Colors } from './Colors';
import { Figure } from './figures/Figure';
import { FigureNames } from './FigureNames';
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
		this.checkKingMate(board);
	}

	public checkKingMate(board: Board): void {
		const whiteKing = board.getKing(Colors.WHITE);
		const blackKing = board.getKing(Colors.BLACK);

		if (whiteKing?.shah) {
			const whiteFigures = this.getFiguresByColor(board, Colors.WHITE);
			if (!this.canAnyFigureMove(whiteFigures, board)) {
				console.log('поставлен мат белым');
			}
		}

		if (blackKing?.shah) {
			const blackFigures = this.getFiguresByColor(board, Colors.BLACK);
			if (!this.canAnyFigureMove(blackFigures, board)) {
				console.log('поставлен мат черным');
			}
		}
	}
	private getFiguresByColor(board: Board, color: Colors): Figure[] {
		const figures = [] as Figure[];
		for (let row of board.cells) {
			for (let cell of row) {
				if (cell.figure?.color === color) {
					figures.push(cell.figure);
				}
			}
		}
		return figures;
	}

	private canAnyFigureMove(figures: Figure[], board: Board): boolean {
		for (let figure of figures) {
			for (let row of board.cells) {
				for (let cell of row) {
					if (figure.canMove(cell)) {
						return true;
					}
				}
			}
		}
		return false;
	}

	public moveFigure(target: Cell, board: Board): void {
		if (this.figure?.color === board.move) {
			if (this.figure && this.figure?.canMove(target) && target.figure?.name !== FigureNames.KING) {
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
