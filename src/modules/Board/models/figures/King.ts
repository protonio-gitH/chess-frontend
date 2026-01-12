import { Figure } from './Figure';
import { Colors } from '../../../../constants';
import { FigureNames } from '../../constants/';
import { Cell } from '../Cell';
import blackLogo from '../../assets/figures/black-king.svg';
import whiteLogo from '../../assets/figures/white-king.svg';
import { Rook } from './Rook';

export class King extends Figure {
	shah: boolean;
	shahFigures: Figure[];
	stalemate: boolean;
	castling: boolean;
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
		this.name = FigureNames.KING;
		this.shah = false;
		this.shahFigures = [];
		this.stalemate = false;
		this.castling = true;
	}

	private flangUnderAttack(flang: Cell[]): boolean {
		for (let cell of flang) {
			if (this.cell.board.isCellUnderAttack(cell, this.cell)) {
				return true;
			}
		}
		return false;
	}

	private canCastle(allyRooks: Rook[], target: Cell): boolean {
		if (this.castling && (allyRooks[0]?.castling || allyRooks[1]?.castling) && !this.shah) {
			const flangs = this.cell.board.getCellsForCastling(this);
			const queenFlangClear = this.isFlangClear(flangs[0]);
			const kingFlangClear = this.isFlangClear(flangs[1]);
			if (queenFlangClear && this.isValidQueenSideCastle(allyRooks[0], flangs[0], target)) {
				return true;
			} else if (kingFlangClear && this.isValidKingSideCastle(allyRooks[1], flangs[1], target)) {
				return true;
			}
		}
		return false;
	}

	private isFlangClear(flang: Cell[]): boolean {
		return flang.every(cell => cell.figure === null);
	}

	private isValidQueenSideCastle(rook: Rook | undefined, flang: Cell[], target: Cell): boolean {
		if (rook?.castling && !this.flangUnderAttack(flang)) {
			return (
				flang.some(cell => cell.x === target.x && cell.y === target.y) ||
				(rook.cell.x === target.x && rook.cell.y === target.y)
			);
		}
		return false;
	}

	private isValidKingSideCastle(rook: Rook | undefined, flang: Cell[], target: Cell): boolean {
		if (rook?.castling && !this.flangUnderAttack(flang)) {
			return (
				flang.some(cell => cell.x === target.x && cell.y === target.y) ||
				(rook.cell.x === target.x && rook.cell.y === target.y)
			);
		}
		return false;
	}

	protected validMove(target: Cell): boolean {
		const dy = target.y - this.cell.y;
		const dx = target.x - this.cell.x;
		const absDy = Math.abs(dy);
		const absDx = Math.abs(dx);
		const allyRooks = this.cell.board.getAllyRooks(this);

		const originalCell = this.cell;
		const originalTargetFigure = target.figure;

		this.cell.figure = null;
		target.figure = this;
		this.cell = target;
		const targetUnderAttack = target.board.isCellUnderAttack(target, this.cell);

		this.cell = originalCell;
		originalCell.figure = this;
		target.figure = originalTargetFigure;

		if (targetUnderAttack) {
			return false;
		}

		if (this.canCastle(allyRooks, target)) {
			return true;
		}

		if (target?.figure?.color === this.color) {
			return false;
		}

		if (absDx > 1) return false;
		else if (absDy > 1) return false;

		return true;
	}
}
