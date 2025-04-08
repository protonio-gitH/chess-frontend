import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
// import { BoardComponent } from '@/modules/Board';
// import { Board } from '@/modules/Board';
// import { useSelected } from '@/modules/Board';
import { useSelected } from '../modules/Board/hooks/useSelected';
import BoardComponent from '../modules/Board/components/Board';
import { Board } from '../modules/Board/models/Board';

function App() {
	const [board, setBoard] = useState<Board>(new Board());
	const [selectedCell, setSelectedCell, selectHandler, updateBoard] = useSelected(board, setBoard);

	useEffect(() => {
		restart();
	}, []);

	function restart() {
		const newBoard = new Board();
		newBoard.initCells();
		newBoard.initFigures();
		setBoard(newBoard);
	}

	return (
		<div className={styles.app}>
			<BoardComponent board={board} setBoard={setBoard} />
		</div>
	);
}

export default App;
