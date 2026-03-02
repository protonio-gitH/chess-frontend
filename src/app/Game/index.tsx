import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Board, BoardComponent, isBoardDTO, useSelected } from '../../modules/Board';
import { Colors } from '../../constants';
import { Move } from '../../modules/MoveHistory';
import { MoveHistoryContainer } from '../../modules/MoveHistory';
import { useParams } from 'react-router-dom';
import { getGameInfoThunk } from '../../store/game.slice';
import handleThunk from '../../utils/handleThunk';
import { useAppDispatch, useAppSelector } from '../../store';
import Loading from '../../components/Loading';
import NotFound from '../NotFound';
import { useServices } from '../../hooks/useServices';
import { useSnackBar } from '../../hooks/useSnackBar';

function Game() {
	const [board, setBoard] = useState<Board>();
	const [moves, setMoves] = useState<Record<Colors.WHITE | Colors.BLACK, Move[]>>({
		[Colors.WHITE]: [],
		[Colors.BLACK]: [],
	});
	const { snackBarState, setSnackBarState } = useSnackBar();
	const dispatch = useAppDispatch();
	const { gameId } = useParams<{ gameId: string }>();
	const status = useAppSelector(state => state.game.status);
	const errorStatus = useAppSelector(state => state.game.errorStatus);
	const socket = useServices().getSocket();
	useEffect(() => {
		if (!gameId) return;
		handleThunk(dispatch, getGameInfoThunk, { gameId });
		socket.emit('join-game', { gameId }, response => {
			const boardDTO = JSON.parse(response.data);
			if (isBoardDTO(boardDTO)) {
				setBoard(Board.fromDTO(boardDTO));
			} else {
				setSnackBarState({ ...snackBarState, open: true, message: 'Failed to load game data' });
			}
		});
	}, [gameId]);

	// useEffect(() => {
	// 	restart();
	// }, []);

	useEffect(() => {
		if (board) {
			const moves = board.moveHistory.getMoves();
			setMoves({
				white: [...moves.movesWhite],
				black: [...moves.movesBlack],
			});
		}
	}, [board?.move]);

	// function restart() {
	// 	const newBoard = new Board();
	// 	newBoard.initCells();
	// 	newBoard.initFigures();
	// 	setBoard(newBoard);
	// }

	switch (status) {
		case 'loading':
			return <Loading />;
		case 'error':
			if (errorStatus === 404) return <NotFound />;
			throw new Error('Something went wrong');
		case 'success':
			if (!board) return <Loading />;
			return (
				<div className={styles.game}>
					<div className={styles.gameContent}>
						<BoardComponent board={board} setBoard={setBoard} />
						<MoveHistoryContainer board={board} setBoard={setBoard} moves={moves} setMoves={setMoves} />
					</div>
				</div>
			);
		default:
			return null;
	}
}

export default Game;
