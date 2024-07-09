import { Cell } from '../Cell';
import { Colors } from '../Colors';
import { Figure } from './Figure';
import { FigureNames } from '../FigureNames';
import blackLogo from '../../assets/figures/black-knight.svg';
import whiteLogo from '../../assets/figures/white-knight.svg';
import { King } from './King';

export class Knight extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);
		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
		this.name = FigureNames.KNIGHT;
	}

	public validMove(target: Cell): boolean {
		const dy = this.cell.y - target.y;
		const dx = this.cell.x - target.x;
		const absDy = Math.abs(dy);
		const absDx = Math.abs(dx);

		if (target?.figure?.color === this.color) {
			return false;
		}

		if ((absDx === 1 && absDy === 2) || (absDx === 2 && absDy === 1)) {
			return true;
		}

		return false;
	}
}
