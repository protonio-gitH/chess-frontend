import { Game } from './game.types';

export interface GameState {
	gameInfo: Game | null;
	loading: boolean;
}
