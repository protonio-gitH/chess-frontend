import { Colors } from '../../Board';
import { Move } from '../types/moveTypes';

class MoveHistory {
	private movesWhite: Move[] = [];
	private movesBlack: Move[] = [];
	constructor() {}

	public addMove(move: Move, color: Colors) {
		color === Colors.WHITE ? this.movesWhite.push(move) : this.movesBlack.push(move);
	}

	public getMoves() {
		return { movesWhite: this.movesWhite, movesBlack: this.movesBlack };
	}

	public clearMoves() {
		this.movesWhite = [];
		this.movesBlack = [];
	}
}
export default MoveHistory;
