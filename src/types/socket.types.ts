import { BoardDTO } from '../modules/Board/types';

type ClientToServerEvents = {
	'join-game': (data: { gameId: string }, callback: (response: { data: string }) => void) => void;

	move: (data: { gameId: string; move: any }) => void;
};

type ServerToClientEvents = {
	'move-made': (board: BoardDTO) => void;
	connect: () => void;
};

export type { ClientToServerEvents, ServerToClientEvents };
