import { Board } from './Board';
import { Colors } from './Colors';
import { Figure } from './figures/Figure';
import { FigureNames } from './FigureNames';
import { King } from './figures/King';
import { Pawn } from './figures/Pawn';

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
				whiteKing.stalemate = true;
			}
		}

		if (blackKing?.shah) {
			const blackFigures = this.getFiguresByColor(board, Colors.BLACK);
			if (!this.canAnyFigureMove(blackFigures, board)) {
				blackKing.stalemate = true;
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

	private enPassantLogic(thisCell: Cell, target: Cell, board: Board): void {
		const isWhite = this.figure?.color === Colors.WHITE;
		const isBlack = this.figure?.color === Colors.BLACK;

		const direction = isWhite ? -1 : 1;
		const pawn = this.figure as Pawn;

		if (target.x === pawn.enPassantCell?.x && target.y === pawn.enPassantCell?.y && target.figure === null) {
			board.getCell(target.x, target.y - direction).figure = null;
			pawn.enPassantCell = null;
		}

		if ((thisCell.figure?.cell.y === 1 || thisCell.figure?.cell.y === 6) && (target.y === 3 || target.y === 4)) {
			pawn.enPassant = true;

			if (board.getCell(target.x + 1, target.y)?.figure?.name === FigureNames.PAWN) {
				const pawnNear = board.getCell(target.x + 1, target.y).figure as Pawn;
				pawnNear.enPassantCell = board.getCell(this.x, this.y + direction);
			} else if (board.getCell(target.x - 1, target.y)?.figure?.name === FigureNames.PAWN) {
				const pawnNear = board.getCell(target.x - 1, target.y).figure as Pawn;
				pawnNear.enPassantCell = board.getCell(this.x, this.y + direction);
			}
		} else {
			pawn.enPassant = false;
			pawn.enPassantCell = null;
		}
	}

	public moveFigure(target: Cell, board: Board): void {
		const isWhite = this.figure?.color === Colors.WHITE;
		const isBlack = this.figure?.color === Colors.BLACK;

		if (this.figure?.color === board.move) {
			if (this.figure && this.figure?.canMove(target) && target.figure?.name !== FigureNames.KING) {
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

				if (this.figure?.name === FigureNames.PAWN) {
					this.enPassantLogic(this, target, board);
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
