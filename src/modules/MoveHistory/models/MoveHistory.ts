import { Colors } from '../../../constants';
import { CellDTO } from '../../Board';
import { Move } from '../types/move.types';

class MoveHistory {
	private movesWhite: Move[] = [];
	private movesBlack: Move[] = [];
	private lastMove: Move | null = null;
	private currentMove: Move | null = null;
	private initCells: CellDTO[][] = [];

	// public toDto() {
	// 	return {
	// 		movesWhite: this.movesWhite,
	// 		movesBlack: this.movesBlack,
	// 		lastMove: this.lastMove,
	// 		currentMove: this.currentMove,
	// 		initCells: this.initCells.map(row => row.map(cell => cell.toDto())),
	// 	};
	// }

	public addMove(move: Move, color: Colors): void {
		color === Colors.WHITE ? this.movesWhite.push(move) : this.movesBlack.push(move);
		this.lastMove = move;
	}

	public getMoves(): Record<'movesWhite' | 'movesBlack', Move[]> {
		return { movesWhite: this.movesWhite, movesBlack: this.movesBlack };
	}

	public getLastMove(): Move | null {
		return this.lastMove;
	}

	public setLastMove(move: Move | null): void {
		this.lastMove = move;
	}

	public getCurrentMove(): Move | null {
		return this.currentMove;
	}

	public setCurrentMove(move: Move | null): void {
		this.currentMove = move;
	}

	public clearMoves(): void {
		this.movesWhite = [];
		this.movesBlack = [];
	}

	public getInitCells(): CellDTO[][] {
		return this.initCells;
	}

	public setInitCells(initCells: CellDTO[][]): void {
		this.initCells = initCells;
	}
}
export default MoveHistory;
