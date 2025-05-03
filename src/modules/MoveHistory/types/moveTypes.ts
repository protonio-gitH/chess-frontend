import { Cell } from '../../Board/';
import { MOVE_TYPES } from '../constants/Moves';

interface Move {
	moveType: MOVE_TYPES;
	from: Cell;
	to: Cell;
	cellsDump: Cell[][];
	title: string;
}

export type { Move };
