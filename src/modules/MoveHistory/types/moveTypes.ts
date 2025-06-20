import { Cell } from '../../Board/';
import { MOVE_TYPES } from '../constants/Moves';

type CellWithNullBoard = Omit<Cell, 'board'> & { board: null };

type HandleMoveClick = (move: Move) => void;

interface Move {
	moveType: MOVE_TYPES;
	from: CellWithNullBoard;
	to: CellWithNullBoard;
	cellsDump: CellWithNullBoard[][];
	title: string;
}

export type { Move, CellWithNullBoard, HandleMoveClick };
