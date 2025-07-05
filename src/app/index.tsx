import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Board, BoardComponent, Colors, useSelected } from '../modules/Board';
import { MoveList } from '../modules/MoveHistory';
import { Move } from '../modules/MoveHistory';
import { MoveHistoryContainer } from '../modules/MoveHistory';

function App() {
	const [board, setBoard] = useState<Board>(new Board());
	const [moves, setMoves] = useState<Record<Colors.WHITE | Colors.BLACK, Move[]>>({
		[Colors.WHITE]: [],
		[Colors.BLACK]: [],
	});

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

	return (
		<div className={styles.app}>
			<div className={styles.playContent}>
				<BoardComponent board={board} setBoard={setBoard} />
				<MoveHistoryContainer board={board} setBoard={setBoard} moves={moves} setMoves={setMoves} />
			</div>
		</div>
	);
}

export default App;
