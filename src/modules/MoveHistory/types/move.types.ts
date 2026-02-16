import { Cell, CellDTO, Figure, Files } from '../../Board';
import { MOVE_TYPES } from '../constants/';
import { Colors } from '../../../constants';

// type CellWithNullBoard = Omit<Cell, 'board'> & { board: null };

// interface CellWithNullBoard {
// 	readonly x: number;
// 	readonly y: number;
// 	readonly color: Colors;
// 	readonly file: Files;
// 	readonly id: number;
// 	figure: Figure | null;
// 	available: boolean;
// 	board: null;
// }

type HandleMoveClick = (move: Move) => void;

interface Move {
	id: number;
	moveType: MOVE_TYPES;
	from: CellDTO;
	to: CellDTO;
	cellsDump: CellDTO[][];
	title: string;
	color: Colors;
}

type MoveActions = 'first' | 'next' | 'prev' | 'last';

export type { Move, HandleMoveClick, MoveActions };
