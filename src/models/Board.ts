import { Cell } from './Cell';
import { Colors } from './Colors';
import { Bishop } from './figures/Bishop';
import { FigureNames } from './figures/Figure';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Rook } from './figures/Rook';

export class Board {
	cells: Cell[][] = [];
	move: Colors = Colors.WHITE;

	public initCells() {
		for (let i = 0; i < 8; i++) {
			const row: Cell[] = [];
			for (let j = 0; j < 8; j++) {
				if ((i + j) % 2 !== 0) {
					row.push(new Cell(j, i, Colors.BLACK, null, this));
				} else {
					row.push(new Cell(j, i, Colors.WHITE, null, this));
				}
			}
			this.cells.push(row);
		}
	}

	public getKing(color: Colors): King | null {
		for (let row of this.cells) {
			for (let cell of row) {
				if (cell.figure?.name === FigureNames.KING && cell.figure.color === color) {
					return cell.figure as King;
				}
			}
		}
		return null;
	}

	public isCellUnderAttack(cell: Cell, selfCell: Cell): boolean {
		for (let row of this.cells) {
			for (let targetCell of row) {
				if (
					targetCell.figure &&
					targetCell.figure.color !== selfCell.figure?.color &&
					!(targetCell.figure instanceof King)
				) {
					if (targetCell.figure.canMove(cell)) {
						return true;
					} else if (targetCell.figure.name === FigureNames.BISHOP) {
						const king = selfCell.figure as King;

						if (king.shahFigures.some(i => i.id === targetCell.figure?.id)) {
							if (targetCell.x < selfCell.x) {
								if (cell.x === selfCell.x + 1 && cell.y === selfCell.y + 1) {
									return true;
								}
							}
						}
					}
				}
			}
		}
		return false;
	}

	public getCell(x: number, y: number) {
		return this.cells[y][x];
	}

	public getCopyBoard(): Board {
		const newBoard = new Board();
		newBoard.cells = this.cells;
		newBoard.move = this.move;
		return newBoard;
	}

	public hightlightCells(selectedCell: Cell | null) {
		for (let i = 0; i < this.cells.length; i++) {
			const row = this.cells[i];
			for (let j = 0; j < row.length; j++) {
				const target = row[j];
				target.available = selectedCell?.figure?.color === this.move ? !!selectedCell?.figure?.canMove(target) : false;
			}
		}
	}

	public changeMoveColor() {
		this.move = this.move === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
	}

	private addPawns() {
		for (let i = 0; i < 8; i++) {
			new Pawn(Colors.BLACK, this.getCell(i, 1));
			new Pawn(Colors.WHITE, this.getCell(i, 6));
		}
	}

	private addKings() {
		new King(Colors.BLACK, this.getCell(4, 0));
		new King(Colors.WHITE, this.getCell(4, 7));
	}

	private addQueens() {
		new Queen(Colors.BLACK, this.getCell(3, 0));
		new Queen(Colors.WHITE, this.getCell(3, 7));
	}
	private addRooks() {
		new Rook(Colors.BLACK, this.getCell(0, 0));
		new Rook(Colors.BLACK, this.getCell(7, 0));
		new Rook(Colors.WHITE, this.getCell(0, 7));
		new Rook(Colors.WHITE, this.getCell(7, 7));
	}
	private addBishops() {
		new Bishop(Colors.BLACK, this.getCell(2, 0));
		new Bishop(Colors.BLACK, this.getCell(5, 0));
		new Bishop(Colors.WHITE, this.getCell(2, 7));
		new Bishop(Colors.WHITE, this.getCell(5, 7));
	}
	private addKnights() {
		new Knight(Colors.BLACK, this.getCell(1, 0));
		new Knight(Colors.BLACK, this.getCell(6, 0));
		new Knight(Colors.WHITE, this.getCell(1, 7));
		new Knight(Colors.WHITE, this.getCell(6, 7));
	}

	public initFigures() {
		this.addPawns();
		this.addBishops();
		this.addKings();
		this.addQueens();
		this.addKnights();
		this.addRooks();
	}
}
