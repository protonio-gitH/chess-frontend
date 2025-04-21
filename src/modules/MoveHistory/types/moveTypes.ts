import { Cell } from '../../Board/';
import { MOVE_TYPES } from '../constants/Moves';

interface Move {
	moveType: MOVE_TYPES;
	from: string;
	to: string;
	cellsDump: Cell[];
}

export type { Move };
