import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './Game';
import Main from './Main';
import Layout from '../components/Layout';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Main />} />
					<Route path="game" element={<Game />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
