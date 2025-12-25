import { GameStatus } from '../../GamesList/constants';
import { Colors } from '../../Board';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface CreateGameResponse {
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

export type CreateGameFunction = (
	path: string,
	options?: AxiosRequestConfig,
) => Promise<AxiosResponse<CreateGameResponse>>;
