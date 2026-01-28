import { Game } from './game.types';

type Status = 'idle' | 'loading' | 'success' | 'error';

export interface GameState {
	gameInfo: Game | undefined;
	status: Status;
	errorStatus: number | undefined;
	// loading: boolean;
}
