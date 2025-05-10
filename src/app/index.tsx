import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Board, BoardComponent, useSelected } from '../modules/Board';
import { MoveList } from '../modules/MoveHistory';
import { Move } from '../modules/MoveHistory/types/moveTypes';
function App() {
	const [board, setBoard] = useState<Board>(new Board());
	const [moves, setMoves] = useState<Record<'white' | 'black', Move[]>>({ white: [], black: [] });
	const { selectedCell, setSelectedCell, selectHandler, updateBoard } = useSelected(board, setBoard);

	useEffect(() => {
		restart();
	}, []);

	useEffect(() => {
		const moves = board.moveHistory.getMoves();
		setMoves({
			white: [...moves.movesWhite],
			black: [...moves.movesBlack],
		});
	}, [board.move]);

	function restart() {
		const newBoard = new Board();
		newBoard.initCells();
		newBoard.initFigures();
		setBoard(newBoard);
	}

	function handleMoveClick(move: Move) {
		const newBoard = board.getMoveBoard(move);
		setBoard(newBoard);
	}

	return (
		<div className={styles.app}>
			<BoardComponent board={board} setBoard={setBoard} />
			<MoveList whiteMoves={moves.white} blackMoves={moves.black} handleMoveClick={handleMoveClick} />
		</div>
	);
}

export default App;
