import React, { useEffect, useState } from 'react';

import { 
	INITIAL_BOARD,
	PLAYER_ONE,
	PLAYER_TWO, 
	getPossibilities,
} from "./gameHelpers";

let winner = null;
const selected = [null, null];
let flag = false;

export default function Chess() {
	const [board, setBoard] = useState(INITIAL_BOARD);
	const [currPlayer, setCurrPlayer] = useState(PLAYER_ONE);
	const [poss, setPoss] = useState([]);
	const [gameCompleted, setGameCompleted] = useState(false);

	const checkGameOver = () => {
		let x = true;

		board.forEach(row => {
			if (row.includes(currPlayer[4]))
				x = false;
		})
		if (x){
			setGameCompleted(true);
			winner = currPlayer === PLAYER_ONE ? "White" : "Black"
		}
	}

	useEffect(checkGameOver, [board, currPlayer]);

	const movePiece = (i,j) => {
		const newBoard = board.map(e => [...e]);

		if (newBoard[selected[0]][selected[1]] === "♟" ||
			newBoard[selected[0]][selected[1]] === "♙"){
			if (i === 0 || i === 7)
				newBoard[selected[0]][selected[1]] = currPlayer[3];
		}

		newBoard[i][j] = newBoard[selected[0]][selected[1]];
		newBoard[selected[0]][selected[1]] = " ";

		selected[0] = null;
		selected[1]= null;
		setBoard(newBoard);
		setPoss([]);
		setCurrPlayer(oldPlayer => 
			oldPlayer === PLAYER_ONE ?
			PLAYER_TWO : PLAYER_ONE
		);
	}

	const handleClick = (i,j) => {
		if (poss.some(pos => pos[0] === i && pos[1] === j))
			movePiece(i,j);
		else if (currPlayer.includes(board[i][j])){
			setPoss(getPossibilities([[i, j], board, currPlayer]));
			selected[0] = i;
			selected[1] = j;
		}
	}

	if (gameCompleted)
		return (
			<div className="full-screen">
				<p className="game-over">GAME OVER</p>
				<p className="winner">{ winner } wins</p>
				<button onClick={() => window.location.reload()} className="new-game-btn">
					New Game
				</button>
			</div>
		);

	return (
		<div className="full-screen">
			<p>Current Player: {
				currPlayer !== PLAYER_ONE ? 
				"WHITE" : "BLACK"
			}</p>
			<div className="board-container">
				{
					board.map((row, i) =>
						<div key={i} className="board-row">
							{
								row.map((col, j) => 
									<div 
										onClick={() => handleClick(i,j)}
										key={j} 
										className={
											`board-item ${
												poss.some(pos => 
												pos[0] === i &&
												pos[1] === j) ||
												(selected[0] === i &&
												selected[1] === j) ? 
												"poss" : ""
											} ${
												flag ? 
												"black " : ""
											} ${
												PLAYER_ONE.includes(col) ?
												"player-black" : ""
											}`
									}>
										{col}
										{flag = !flag}
									</div>
								)
							}
							{flag = !flag}
						</div>
					)
				}
			</div>
		</div>
	)
}