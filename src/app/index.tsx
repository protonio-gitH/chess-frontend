import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import BoardComponent from '../components/Board';
import { Board } from '../models/Board';

function App() {
	const [board, setBoard] = useState<Board>(new Board());

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
