import { Move } from '../types/moveTypes';

//добавить возможность запиывать клетки

class MoveHistory {
	private movesWhite: Move[] = [];
	private movesBlack: Move[] = [];
	constructor() {}

	public addMove(move: Move) {
		this.movesWhite.push(move);
		this.movesBlack.push(move);
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
// export const moveHistory = new MoveHistory();
