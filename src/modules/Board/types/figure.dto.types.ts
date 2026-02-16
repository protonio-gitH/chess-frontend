import { Colors } from '../../../constants';
import { Figure } from '../models/figures/Figure';
import logo from '../../figures/assets/black-bishop.svg';
import { FigureNames } from '../constants';
import { Cell } from '../models/Cell';
import { CellDTO } from '.';

interface FigureDTO {
	color: Colors;
	logo: typeof logo | null;
	name: FigureNames;
	id: number;
	// cell: CellDTO;
}

interface KnightDTO extends FigureDTO {}

interface QueenDTO extends FigureDTO {}

interface BishopDTO extends FigureDTO {}

interface RookDTO extends FigureDTO {
	castling: boolean;
}

interface KingDTO extends FigureDTO {
	shah: boolean;
	shahFigures: FigureDTO[];
	stalemate: boolean;
	castling: boolean;
}

interface PawnDTO extends FigureDTO {
	enPassant: boolean;
	enPassantCell: number | null;
}

export type { FigureDTO, RookDTO, KingDTO, PawnDTO, KnightDTO, QueenDTO, BishopDTO };
