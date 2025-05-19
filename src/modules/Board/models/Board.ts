import { Cell } from './Cell';
import { Colors } from '../constants/Colors';
import { Files } from '../constants/Files';
import { Bishop } from './figures/Bishop';
import { FigureNames } from '../constants/FigureNames';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Rook } from './figures/Rook';
import { Move, MoveHistory } from '../../MoveHistory/';
import cloneDeep from 'lodash/cloneDeep';

export class Board {
	cells: Cell[][] = [];
	move: Colors = Colors.WHITE;
	promotion: boolean = false;
	moveHistory: MoveHistory = new MoveHistory();
	fromCell: Cell | null = null;
	toCell: Cell | null = null;

	public initCells() {
		const files = Object.values(Files);

		for (let i = 0; i < 8; i++) {
			const row: Cell[] = [];
			for (let j = 0; j < 8; j++) {
				if ((i + j) % 2 !== 0) {
					row.push(new Cell(j, i, Colors.BLACK, null, files[j], this));
				} else {
					row.push(new Cell(j, i, Colors.WHITE, null, files[j], this));
				}
			}
			this.cells.push(row);
		}
	}

	public getCellsForCastling(king: King): Cell[][] {
		const queenFlang = [] as Cell[];
		const kingFlang = [] as Cell[];

		if ((king.cell.y === 7 && king.cell.x === 4) || (king.cell.y === 0 && king.cell.x === 4)) {
			for (let i = king.cell.x - 1; i > 1; i--) {
				queenFlang.push(this.getCell(i, king.cell.y));
			}
			for (let i = king.cell.x + 1; i < 7; i++) {
				kingFlang.push(this.getCell(i, king.cell.y));
			}
		}

		return [queenFlang, kingFlang];
	}

	public getAllyRooks(king: King): Rook[] {
		const allyRooks = [] as Rook[];

		if (king.cell.y === 7 && king.cell.x === 4) {
			if (this.getCell(0, 7).figure instanceof Rook) {
				const rook = this.getCell(0, 7).figure as Rook;
				if (rook?.castling) allyRooks.push(rook);
			}
			if (this.getCell(7, 7).figure instanceof Rook) {
				const rook = this.getCell(7, 7).figure as Rook;
				if (rook?.castling) allyRooks.push(rook);
			}
		} else if (king.cell.y === 0 && king.cell.x === 4) {
			if (this.getCell(0, 0).figure instanceof Rook) {
				const rook = this.getCell(0, 0).figure as Rook;
				if (rook?.castling) allyRooks.push(rook);
			}
			if (this.getCell(7, 0).figure instanceof Rook) {
				const rook = this.getCell(7, 0).figure as Rook;
				if (rook?.castling) allyRooks.push(rook);
			}
		}
		return allyRooks;
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
				if (this.isEnemyFigure(targetCell, selfCell) && !(targetCell.figure instanceof King)) {
					if (this.canFigureMoveToCell(targetCell, cell)) {
						return true;
					} else if (
						targetCell.figure?.name === FigureNames.BISHOP &&
						this.isBishopOrQueenShahDiagonalMove(targetCell, selfCell, cell)
					) {
						return true;
					} else if (
						targetCell.figure?.name === FigureNames.QUEEN &&
						(this.isBishopOrQueenShahDiagonalMove(targetCell, selfCell, cell) ||
							this.isQueenOrRookShahStraightMove(targetCell, selfCell, cell))
					) {
						return true;
					} else if (
						targetCell.figure?.name === FigureNames.ROOK &&
						this.isQueenOrRookShahStraightMove(targetCell, selfCell, cell)
					) {
						return true;
					}
				}
			}
		}
		return false;
	}

	private isEnemyFigure(targetCell: Cell, selfCell: Cell): boolean {
		return targetCell.figure !== undefined && targetCell.figure?.color !== selfCell.figure?.color;
	}

	private canFigureMoveToCell(targetCell: Cell, cell: Cell): boolean {
		if (targetCell.figure?.name === FigureNames.PAWN) {
			const pawn = targetCell.figure as Pawn;
			const king = this.getKing(targetCell.figure.color) as King;
			return pawn.canMove(cell, true);
		}
		return targetCell.figure?.canMove(cell) ?? false;
	}

	private isShahFigure(king: King, targetCell: Cell): boolean {
		return king.shahFigures.some(i => i.id === targetCell.figure?.id);
	}

	private isBishopOrQueenShahDiagonalMove(targetCell: Cell, selfCell: Cell, cell: Cell): boolean {
		const king = selfCell.figure as King;

		const isShah = this.isShahFigure(king, targetCell);
		if (isShah === false) return false;

		const isWhiteKing = king.color === Colors.WHITE;
		const isTargetCellAbove = targetCell.y > selfCell.y;
		const isTargetCellBelow = targetCell.y < selfCell.y;
		const isTargetCellLeft = targetCell.x < selfCell.x;
		const isTargetCellRight = targetCell.x > selfCell.x;

		if (isWhiteKing) {
			return (
				(isTargetCellBelow && isTargetCellLeft && cell.x === selfCell.x + 1 && cell.y === selfCell.y + 1) ||
				(isTargetCellBelow && isTargetCellRight && cell.x === selfCell.x - 1 && cell.y === selfCell.y + 1) ||
				(isTargetCellAbove && isTargetCellLeft && cell.x === selfCell.x + 1 && cell.y === selfCell.y - 1) ||
				(isTargetCellAbove && isTargetCellRight && cell.x === selfCell.x - 1 && cell.y === selfCell.y - 1)
			);
		} else {
			return (
				(isTargetCellAbove && isTargetCellLeft && cell.x === selfCell.x + 1 && cell.y === selfCell.y - 1) ||
				(isTargetCellAbove && isTargetCellRight && cell.x === selfCell.x - 1 && cell.y === selfCell.y - 1) ||
				(isTargetCellBelow && isTargetCellLeft && cell.x === selfCell.x + 1 && cell.y === selfCell.y + 1) ||
				(isTargetCellBelow && isTargetCellRight && cell.x === selfCell.x - 1 && cell.y === selfCell.y + 1)
			);
		}
	}

	private isQueenOrRookShahStraightMove(targetCell: Cell, selfCell: Cell, cell: Cell): boolean {
		const king = selfCell.figure as King;

		const isShah = this.isShahFigure(king, targetCell);
		if (isShah === false) return false;

		const isWhiteKing = king.color === Colors.WHITE;
		const isTargetCellBelow = targetCell.y < selfCell.y;
		const isTargetCellAbove = targetCell.y > selfCell.y;
		const isTargetCellLeft = targetCell.x < selfCell.x;
		const isTargetCellRight = targetCell.x > selfCell.x;
		const isTargetCellParallel = targetCell.y === selfCell.y;
		const isTargetCellWithoutDeviations = targetCell.x === selfCell.x;

		return (
			(isTargetCellBelow && isTargetCellWithoutDeviations && cell.x === selfCell.x && cell.y === selfCell.y + 1) ||
			(isTargetCellAbove && isTargetCellWithoutDeviations && cell.x === selfCell.x && cell.y === selfCell.y - 1) ||
			(isTargetCellLeft && isTargetCellParallel && cell.x === selfCell.x + 1 && cell.y === selfCell.y) ||
			(isTargetCellRight && isTargetCellParallel && cell.x === selfCell.x - 1 && cell.y === selfCell.y)
		);
	}

	public getCell(x: number, y: number) {
		return this.cells[y][x];
	}

	public getCopyBoard(): Board {
		const newBoard = new Board();
		newBoard.cells = this.cells;
		newBoard.move = this.move;
		newBoard.promotion = this.promotion;
		newBoard.moveHistory = this.moveHistory;
		newBoard.fromCell = this.fromCell;
		newBoard.toCell = this.toCell;
		for (const line of newBoard.cells) {
			for (let cell of line) {
				cell.board = newBoard;
			}
		}
		return newBoard;
	}

	public getMoveBoard(move: Move): Board {
		const newBoard = this.getCopyBoard();
		newBoard.fromCell = move.from;
		newBoard.toCell = move.to;
		newBoard.cells = move.cellsDump;
		for (const line of newBoard.cells) {
			for (let cell of line) {
				cell.board = newBoard;
				cell.available = false;
			}
		}
		return newBoard;
	}

	public changePromotion() {
		this.promotion = !this.promotion;
		for (let i = 0; i < this.cells.length; i++) {
			const row = this.cells[i];
			for (let j = 0; j < row.length; j++) {
				const target = row[j];
				if (target.available) {
					target.available = false;
				}
			}
		}
	}

	public hightlightCells(selectedCell: Cell | null) {
		for (let i = 0; i < this.cells.length; i++) {
			const row = this.cells[i];
			for (let j = 0; j < row.length; j++) {
				const target = row[j];
				if (!this.promotion) {
					target.available =
						selectedCell?.figure?.color === this.move ? !!selectedCell?.figure?.canMove(target) : false;
				}
			}
		}
	}

	public changeMoveColor() {
		this.move = this.move === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
	}

	private addPawns() {
		for (let i = 0; i < 8; i++) {
			new Pawn(Colors.WHITE, this.getCell(i, 1));
			new Pawn(Colors.BLACK, this.getCell(i, 6));
		}
	}

	private addKings() {
		new King(Colors.WHITE, this.getCell(4, 0));
		new King(Colors.BLACK, this.getCell(4, 7));
	}

	private addQueens() {
		new Queen(Colors.WHITE, this.getCell(3, 0));
		new Queen(Colors.BLACK, this.getCell(3, 7));
	}
	private addRooks() {
		new Rook(Colors.WHITE, this.getCell(0, 0));
		new Rook(Colors.WHITE, this.getCell(7, 0));
		new Rook(Colors.BLACK, this.getCell(0, 7));
		new Rook(Colors.BLACK, this.getCell(7, 7));
	}
	private addBishops() {
		new Bishop(Colors.WHITE, this.getCell(2, 0));
		new Bishop(Colors.WHITE, this.getCell(5, 0));
		new Bishop(Colors.BLACK, this.getCell(2, 7));
		new Bishop(Colors.BLACK, this.getCell(5, 7));
	}
	private addKnights() {
		new Knight(Colors.WHITE, this.getCell(1, 0));
		new Knight(Colors.WHITE, this.getCell(6, 0));
		new Knight(Colors.BLACK, this.getCell(1, 7));
		new Knight(Colors.BLACK, this.getCell(6, 7));
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
