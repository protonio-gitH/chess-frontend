import { Colors, GameStatus } from '../constants';

export interface Game {
	id: string;
	status: GameStatus;
	turn: Colors;
	winnerId: string | null;
	creatorId: string;
	whitePlayerId: string | null;
	blackPlayerId: string | null;
	createdAt: Date;
	updatedAt: Date;
}
