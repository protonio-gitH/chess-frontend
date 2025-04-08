import { Cell } from '../models/Cell';

export type CellSelectHandler = (cell: Cell, isDragging?: boolean) => void;
