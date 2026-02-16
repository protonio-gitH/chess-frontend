import { Cell } from './Cell';
import { Colors } from '../../../constants';
import { Files } from '../constants/Files';
import { Bishop } from './figures/Bishop';
import { FigureNames } from '../constants/';
import { King } from './figures/King';
import { Knight } from './figures/Knight';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Rook } from './figures/Rook';
import { Figure } from './figures/Figure';
import { CellWithNullBoard, Move, MoveHistory } from '../../MoveHistory/';
import cloneDeep from 'lodash/cloneDeep';
import { BoardDTO, CellDTO } from '../types';
import { FigureFactory } from './figures/FigureFactory';

export class Board {
	cells: Cell[][] = [];
	move: Colors = Colors.WHITE;
	promotion: boolean = false;
	moveHistory: MoveHistory = new MoveHistory();
	fromCell: Cell | null = null;
	toCell: Cell | null = null;

	static fromDTO(dto: BoardDTO): Board {
		const board = new Board();
		board.promotion = dto.promotion;
		board.move = dto.move;
		if (dto.toCell) {
			// const toCell = new Cell(dto.toCell.x, dto.toCell.y, dto.toCell.color, null, dto.toCell.file, board);
			// if (dto.toCell.figure) {
			// 	const figure = FigureFactory.fromDTO(dto.toCell.figure, dto, toCell);
			// }
			board.toCell = Cell.fromDTO(dto.toCell, board, dto);
		}
		if (dto.fromCell) {
			board.fromCell = Cell.fromDTO(dto.fromCell, board, dto);
		}
		board.cells = dto.cells.map(row => {
			return row.map(cell => {
				// const newCell = new Cell(cell.x, cell.y, cell.color, null, cell.file, board);
				// if (cell.figure) {
				// 	const figure = FigureFactory.fromDTO(cell.figure, dto, newCell);
				// }
				// return newCell;
				return Cell.fromDTO(cell, board, dto);
			});
		});
		return board;
	}

	public toDTO(): BoardDTO {
		return {
			move: this.move,
			promotion: this.promotion,
			moveHistory: this.moveHistory,
			fromCell: this.fromCell?.toDto() ?? null,
			toCell: this.toCell?.toDto() ?? null,
			cells: this.cells.map(row => {
				return row.map(cell => cell.toDto());
			}),
		};
	}

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
		newBoard.moveHistory = new MoveHistory();
		newBoard.moveHistory.setInitCells(this.moveHistory.getInitCells());
		const moves = this.moveHistory.getMoves();
		moves.movesWhite.forEach(move => newBoard.moveHistory.addMove(move, Colors.WHITE));
		moves.movesBlack.forEach(move => newBoard.moveHistory.addMove(move, Colors.BLACK));
		newBoard.moveHistory.setLastMove(this.moveHistory.getLastMove());
		newBoard.moveHistory.setCurrentMove(this.moveHistory.getCurrentMove());
		newBoard.fromCell = this.fromCell ? ({ ...this.fromCell, board: newBoard } as Cell) : null;
		newBoard.toCell = this.toCell ? ({ ...this.toCell, board: newBoard } as Cell) : null;
		for (const line of newBoard.cells) {
			for (let cell of line) {
				cell.board = newBoard;
			}
		}
		return newBoard;
	}

	public getMoveBoard(move: Move): Board {
		const newBoard = this.getCopyBoard();
		const files = Object.values(Files);
		const fromCell = new Cell(move.from.x, move.from.y, move.from.color, null, move.from.file, newBoard);
		const toCell = new Cell(move.to.x, move.to.y, move.to.color, null, move.to.file, newBoard);
		if (move.from.figure) {
			const figure = FigureFactory.fromDTO(move.from.figure, move.cellsDump, fromCell);
		}
		if (move.to.figure) {
			const figure = FigureFactory.fromDTO(move.to.figure, move.cellsDump, toCell);
		}
		newBoard.fromCell = fromCell;
		newBoard.toCell = toCell;
		newBoard.cells = move.cellsDump.map(row =>
			row.map(cellDTO => {
				const cell = new Cell(cellDTO.x, cellDTO.y, cellDTO.color, null, cellDTO.file, newBoard);
				if (cellDTO.figure) FigureFactory.fromDTO(cellDTO.figure, move.cellsDump, cell);
				return cell;
			}),
		);

		return newBoard;
	}

	public getInitBoard(): Board {
		const newBoard = this.getCopyBoard();
		const initCells = newBoard.moveHistory.getInitCells();
		newBoard.fromCell = null;
		newBoard.toCell = null;
		newBoard.cells = initCells.map(row =>
			row.map(nullBoardCell => {
				const cell = new Cell(
					nullBoardCell.x,
					nullBoardCell.y,
					nullBoardCell.color,
					null,
					nullBoardCell.file,
					newBoard,
				);
				if (nullBoardCell.figure) FigureFactory.fromDTO(nullBoardCell.figure, initCells, cell);
				return cell;
			}),
		);

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

	private addInitCellsToHistory() {
		const initCellsWithNullBoard = this.cells.map(row =>
			row.map(cell => {
				// const newCell = new Cell();
				return cell.toDto();
			}),
		);

		this.moveHistory.setInitCells(initCellsWithNullBoard);
	}

	public initFigures() {
		this.addPawns();
		this.addBishops();
		this.addKings();
		this.addQueens();
		this.addKnights();
		this.addRooks();
		this.addInitCellsToHistory();
	}
}
