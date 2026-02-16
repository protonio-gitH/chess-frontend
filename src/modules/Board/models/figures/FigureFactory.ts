import { FigureNames } from '../../constants';
import { BishopDTO, BoardDTO, CellDTO, FigureDTO, KingDTO, KnightDTO, PawnDTO, QueenDTO, RookDTO } from '../../types';
import { Board } from '../Board';
import { Cell } from '../Cell';
import { Bishop } from './Bishop';
import { Figure } from './Figure';
import { King } from './King';
import { Knight } from './Knight';
import { Pawn } from './Pawn';
import { Queen } from './Queen';
import { Rook } from './Rook';

export class FigureFactory {
	static isRookDTO(figure: FigureDTO): figure is RookDTO {
		return figure.name === FigureNames.ROOK;
	}

	static isPawnDTO(figure: FigureDTO): figure is PawnDTO {
		return figure.name === FigureNames.PAWN;
	}

	static isKingDTO(figure: FigureDTO): figure is KingDTO {
		return figure.name === FigureNames.KING;
	}

	static isBishopDTO(figure: FigureDTO): figure is BishopDTO {
		return figure.name === FigureNames.BISHOP;
	}

	static isKnightDTO(figure: FigureDTO): figure is KnightDTO {
		return figure.name === FigureNames.KNIGHT;
	}

	static isQueenDTO(figure: FigureDTO): figure is QueenDTO {
		return figure.name === FigureNames.QUEEN;
	}
	static fromDTO(figureDTO: FigureDTO, cellsDTO: CellDTO[][], cell: Cell): Figure | null {
		let newFigure = null;
		if (FigureFactory.isBishopDTO(figureDTO)) {
			newFigure = new Bishop(figureDTO.color, cell);
		}
		if (FigureFactory.isKingDTO(figureDTO)) {
			newFigure = new King(figureDTO.color, cell);
		}
		if (FigureFactory.isKnightDTO(figureDTO)) {
			newFigure = new Knight(figureDTO.color, cell);
		}
		if (FigureFactory.isQueenDTO(figureDTO)) {
			newFigure = new Queen(figureDTO.color, cell);
		}
		if (FigureFactory.isRookDTO(figureDTO)) {
			newFigure = new Rook(figureDTO.color, cell);
			newFigure.castling = figureDTO.castling;
		}
		if (FigureFactory.isPawnDTO(figureDTO)) {
			newFigure = new Pawn(figureDTO.color, cell);
			newFigure.enPassant = figureDTO.enPassant;
			if (figureDTO.enPassantCell) {
				let enPassantCell;
				const cells = cellsDTO;
				for (let row of cells) {
					for (let cell of row) {
						if (cell.id === figureDTO.enPassantCell) enPassantCell = cell;
					}
				}
				if (enPassantCell) {
					const newEnPassantCell = new Cell(
						enPassantCell.x,
						enPassantCell.y,
						enPassantCell.color,
						null,
						enPassantCell.file,
						newFigure.cell.board,
					);
					if (enPassantCell.figure) FigureFactory.fromDTO(enPassantCell.figure, cellsDTO, newEnPassantCell);
					// newEnPassantCell.figure = newFigure;
					newFigure.enPassantCell = newEnPassantCell;
				}
			}
		}
		return newFigure;
	}
}
