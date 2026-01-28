import { Colors, GameStatus } from '../constants';

interface Player {
	id: string;
	email: string;
}

export interface Game {
	id: string;
	creatorId: string;
	creator: Player;
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
