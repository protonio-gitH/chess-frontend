import { Cell } from '../../Board';
import { MOVE_TYPES } from '../constants/';
import { Colors } from '../../Board';

type CellWithNullBoard = Omit<Cell, 'board'> & { board: null };

type HandleMoveClick = (move: Move) => void;

interface Move {
	id: number;
	moveType: MOVE_TYPES;
	from: CellWithNullBoard;
	to: CellWithNullBoard;
	cellsDump: CellWithNullBoard[][];
	title: string;
	color: Colors;
}

type MoveActions = 'first' | 'next' | 'prev' | 'last';

export type { Move, CellWithNullBoard, HandleMoveClick, MoveActions };
