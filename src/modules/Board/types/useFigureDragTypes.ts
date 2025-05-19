import { Cell } from '../models/Cell';

export type CellSelectHandler = (cell: Cell, isDragging?: boolean, cellElement?: HTMLDivElement | null) => void;
