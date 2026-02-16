import { Colors } from '../../../constants';
import { CellWithNullBoard, MoveHistory } from '../../MoveHistory';
import { Files } from '../constants';
import { Cell } from '../models/Cell';
import { FigureDTO } from './figure.dto.types';

interface CellDTO {
	x: number;
	y: number;
	color: Colors;
	file: Files;
	id: number;
	available: boolean;
	board: null;
	figure: FigureDTO | null;
}

interface BoardDTO {
	cells: CellDTO[][];
	move: Colors;
	promotion: boolean;
	moveHistory: MoveHistory;
	fromCell: CellDTO | null;
	toCell: CellDTO | null;
}

export type { BoardDTO, CellDTO };
