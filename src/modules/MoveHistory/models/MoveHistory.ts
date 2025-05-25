import { Colors } from '../../Board';
import { Move } from '../types/moveTypes';

class MoveHistory {
	private movesWhite: Move[] = [];
	private movesBlack: Move[] = [];
	private lastMove: Move | null = null;
	private currentMove: Move | null = null;
	constructor() {}

	public addMove(move: Move, color: Colors) {
		color === Colors.WHITE ? this.movesWhite.push(move) : this.movesBlack.push(move);
		this.lastMove = move;
	}

	public getMoves(): Record<'movesWhite' | 'movesBlack', Move[]> {
		return { movesWhite: this.movesWhite, movesBlack: this.movesBlack };
	}

	public getLastMove(): Move | null {
		return this.lastMove;
	}

	public setLastMove(move: Move | null) {
		this.lastMove = move;
	}

	public getCurrentMove(): Move | null {
		return this.currentMove;
	}

	public setCurrentMove(move: Move | null) {
		this.currentMove = move;
	}

	public clearMoves() {
		this.movesWhite = [];
		this.movesBlack = [];
	}
}
export default MoveHistory;
