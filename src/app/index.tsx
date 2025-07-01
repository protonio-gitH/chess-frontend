import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Board, BoardComponent, Colors, useSelected } from '../modules/Board';
import { MoveList } from '../modules/MoveHistory';
import { Move } from '../modules/MoveHistory';
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

	function handleMoveClick(move: Move) {
		const newBoard = board.getMoveBoard(move);
		newBoard.moveHistory.setCurrentMove(move);
		setBoard(newBoard);
	}

	function getCurrMove(): Move | null {
		return board.moveHistory.getCurrentMove();
	}

	function handleContolBtnClick(action: 'first' | 'next' | 'prev' | 'last') {
		// const moves = board.moveHistory.getMoves();
		const currentMove = board.moveHistory.getCurrentMove();
		if (action === 'first') {
			board.moveHistory.setCurrentMove(null);
			setBoard(board.getInitBoard());
		}
		if (action === 'next') {
			let nextMove = currentMove;
			if (currentMove?.color === Colors.WHITE) {
				nextMove = moves.black.find(move => move.id === currentMove.id + 1) ?? currentMove;
			}
			if (currentMove?.color === Colors.BLACK) {
				nextMove = moves.white.find(move => move.id === currentMove.id + 1) ?? currentMove;
			}
			if (!currentMove) {
				nextMove = moves.white[0];
			}
			board.moveHistory.setCurrentMove(nextMove);
		}

		if (action === 'prev') {
			let prevMove = currentMove;
			if (currentMove?.color === Colors.WHITE) {
				prevMove = moves.black.find(move => move.id === currentMove.id - 1) ?? currentMove;
			}
			if (currentMove?.color === Colors.BLACK) {
				prevMove = moves.white.find(move => move.id === currentMove.id - 1) ?? currentMove;
			}
			board.moveHistory.setCurrentMove(prevMove);
		}

		if (action === 'last') {
			board.moveHistory.setCurrentMove(board.moveHistory.getLastMove());
		}

		const currentMoveForBoard = board.moveHistory.getCurrentMove();
		if (currentMoveForBoard) {
			const newBoard = board.getMoveBoard(currentMoveForBoard);
			setBoard(newBoard);
		}
	}

	return (
		<div className={styles.app}>
			<div className={styles.playContent}>
				<BoardComponent board={board} setBoard={setBoard} />
				<MoveList
					whiteMoves={moves.white}
					blackMoves={moves.black}
					handleMoveClick={handleMoveClick}
					currentMove={getCurrMove()}
					handleContolBtnClick={handleContolBtnClick}
				/>
			</div>
		</div>
	);
}

export default App;
