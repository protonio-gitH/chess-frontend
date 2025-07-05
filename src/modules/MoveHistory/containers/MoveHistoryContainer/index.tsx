import React, { memo, FC, useEffect, useCallback } from 'react';
import MoveList from '../../components/MoveList';
import { Move } from '../../types/moveTypes';
import { Board } from '../../../Board';
import { Colors } from '../../../Board';
import { MoveActions } from '../../types/moveTypes';

interface MoveHistoryContainerProps {
	board: Board;
	setBoard: React.Dispatch<React.SetStateAction<Board>>;
	moves: Record<Colors.WHITE | Colors.BLACK, Move[]>;
	setMoves: React.Dispatch<React.SetStateAction<Record<Colors, Move[]>>>;
}

const MoveHistoryContainer: FC<MoveHistoryContainerProps> = ({ board, setBoard, moves, setMoves }) => {
	useEffect(() => {
		const moves = board.moveHistory.getMoves();
		setMoves({
			white: [...moves.movesWhite],
			black: [...moves.movesBlack],
		});
	}, [board.move]);

	const getCurrMove = useCallback((): Move | null => {
		return board.moveHistory.getCurrentMove();
	}, [board]);

	const handleMoveClick = useCallback(
		(move: Move) => {
			const newBoard = board.getMoveBoard(move);
			newBoard.moveHistory.setCurrentMove(move);
			setBoard(newBoard);
		},
		[board, setBoard],
	);

	const getMoveByAction = useCallback(
		(current: Move | null, action: MoveActions): Move | null => {
			if (action === 'first') return null;
			if (action === 'last') return board.moveHistory.getLastMove();
			if (!current) return moves.white[0];

			const delta = action === 'next' ? 1 : -1;
			const color = current.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
			const nextId = current.id + delta;

			return moves[color].find(move => move.id === nextId) ?? current;
		},
		[board, moves],
	);

	const handleContolBtnClick = useCallback(
		(action: MoveActions) => {
			const currentMove = board.moveHistory.getCurrentMove();
			if (action === 'prev' && currentMove?.id === 1) {
				board.moveHistory.setCurrentMove(null);
				setBoard(board.getInitBoard());
				return;
			}
			const nextMove = getMoveByAction(currentMove, action);
			board.moveHistory.setCurrentMove(nextMove);
			const updatedBoard = nextMove ? board.getMoveBoard(nextMove) : board.getInitBoard();
			setBoard(updatedBoard);
		},
		[board, getMoveByAction, setBoard],
	);

	return (
		<MoveList
			whiteMoves={moves.white}
			blackMoves={moves.black}
			handleMoveClick={handleMoveClick}
			currentMove={getCurrMove()}
			handleContolBtnClick={handleContolBtnClick}
		/>
	);
};

export default memo(MoveHistoryContainer);
