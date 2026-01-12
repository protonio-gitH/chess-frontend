import { Colors, GameStatus } from '../../../constants';

interface Player {
	id: string;
	email: string;
}

interface Game {
	id: string;
	creatorId: string;
	whitePlayerId: string | null;
	blackPlayerId: string | null;
	whitePlayer: Player | null;
	blackPlayer: Player | null;
	status: GameStatus;
	winnerId: string | null;
	turn: Colors;
	players: Player[];
	createdAt: string;
	updatedAt: string;
}

export interface ListState {
	gamesList: Game[];
}
