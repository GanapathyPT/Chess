// INITIAL_BOARD to start the game
export const INITIAL_BOARD = [
	["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
	["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
	[" ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " "],
	[" ", " ", " ", " ", " ", " ", " ", " "],
	["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
	["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
];

// required condition to validate the positions 
const condition = (x, y) => x > -1 && x < 8 && y > -1 && y < 8;

// assuming the players from each piece color
export const PLAYER_ONE = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜", "♟"]; // BLACK
export const PLAYER_TWO = ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖", "♙"]; // WHITE

// getting all possibility for a soldier piece
const possibilitiesForSoldier = (args) => {
	const res = [];

	const [pos, board, currPlayer] = args;

	const nextPiece = currPlayer === PLAYER_ONE ? 
		[pos[0] - 1, pos[1]] :
		[pos[0] + 1, pos[1]];

	const left = board[nextPiece[0]][nextPiece[1] - 1] !== " "
		&& !currPlayer.includes(board[nextPiece[0]][nextPiece[1] - 1]) ?
			[nextPiece[0], nextPiece[1] - 1] : null;

	const right = board[nextPiece[0]][nextPiece[1] + 1] !== " "
		&& !currPlayer.includes(board[nextPiece[0]][nextPiece[1] + 1]) ?
			[nextPiece[0], nextPiece[1] + 1] : null;

	if (!!left)
		res.push(left);

	if (!!right)
		res.push(right);

	if (board[nextPiece[0]][nextPiece[1]] === " ")
		res.push(nextPiece);

	return res;
}

// gettinga all possibility for a knight
const getPossibilitiesForKnight = (args) => {
	const [pos, board, currPlayer] = args;

	const res = [];

	res.push([pos[0] + 2, pos[1] + 1]);
	res.push([pos[0] + 2, pos[1] - 1]);
	res.push([pos[0] - 2, pos[1] + 1]);
	res.push([pos[0] - 2, pos[1] - 1]);

	res.push([pos[0] + 1, pos[1] + 2]);
	res.push([pos[0] + 1, pos[1] - 2]);
	res.push([pos[0] - 1, pos[1] + 2]);
	res.push([pos[0] - 1, pos[1] - 2]);

	const finalRes = [];

	res.forEach((item) => {
		if (item[0] < 8 && item[1] > -1 && item[0] > -1 && item[1] < 8){
			const piece = board[item[0]][item[1]]
			if (piece !== " " && !currPlayer.includes(piece))
				finalRes.push(item);
			else if (piece === " ")
				finalRes.push(item);
		}
	})

	return finalRes;
}

// getting all possibility for king
const getPossibilitiesForKing = (args) => {
	const [pos, board, currPlayer] = args;

	const res = [];

	res.push([pos[0] - 1 , pos[1]]);
	res.push([pos[0] + 1 , pos[1]]);
	res.push([pos[0] , pos[1] - 1]);
	res.push([pos[0] , pos[1] + 1]);
	res.push([pos[0] + 1 , pos[1] + 1]);
	res.push([pos[0] - 1 , pos[1] - 1]);
	res.push([pos[0] - 1 , pos[1] + 1]);
	res.push([pos[0] + 1 , pos[1] - 1]);

	const finalRes = [];

	res.forEach(item => {
		if (item[0] < 8 && item[1] > -1 && item[0] > -1 && item[1] < 8){
			const piece = board[item[0]][item[1]]
			if (piece !== " " && !currPlayer.includes(piece))
				finalRes.push(item);
			else if (piece === " ")
				finalRes.push(item);
		}
	})

	return finalRes;
}

// getting all possibility for Pawn
const getPossibilitiesForPawn = (args) => {
	const [pos, board, currPlayer] = args;

	const res = [];

	// horizontal right
	for (let i=pos[1] + 1; i<8; i++){
		if (board[pos[0]][i] !== " "){
			if (!currPlayer.includes(board[pos[0]][i]))
				res.push([pos[0], i]);
			break;
		}
		res.push([pos[0], i]);
	}
	// vertical top
	for (let i=pos[0] - 1; i>-1; i--){
		if (board[i][pos[1]] !== " "){
			if (!currPlayer.includes(board[i][pos[1]]))
				res.push([i, pos[1]]);
			break;
		}
		res.push([i, pos[1]]);
	}
	// horizontal left
	for (let i=pos[1] - 1; i>-1; i--){
		if (board[pos[0]][i] !== " "){
			if (!currPlayer.includes(board[pos[0]][i]))
				res.push([pos[0], i]);
			break;
		}
		res.push([pos[0], i]);
	}
	// vertical bottom
	for (let i=pos[0] + 1; i<8; i++){
		if (board[i][pos[1]] !== " "){
			if (!currPlayer.includes(board[i][pos[1]]))
				res.push([i, pos[1]]);
			break;
		}
		res.push([i, pos[1]]);
	}

	return res;
}

const getPossibilitiesForBishop = args => {
	const [pos, board, currPlayer] = args;

	const res = [];

	// top right
	let [i, j] = pos;
	i--;j++;
	while (condition(i, j)){
		if (board[i][j] !== " "){
			if (!currPlayer.includes(board[i][j]))
				res.push([i, j]);
			break;
		}
		res.push([i,j])
		i--;j++;
	}

	// top left
	i = pos[0] - 1;j = pos[1] - 1;
	while (condition(i, j)){
		if (board[i][j] !== " "){
			if (!currPlayer.includes(board[i][j]))
				res.push([i, j]);
			break;
		}
		res.push([i, j])
		i--;j--;
	}

	// bottom left
	i = pos[0] + 1;j = pos[1] - 1;
	while (condition(i, j)){
		if (board[i][j] !== " "){
			if (!currPlayer.includes(board[i][j]))
				res.push([i, j]);
			break;
		}
		res.push([i, j])
		i++;j--;
	}

	// bottom right
	i = pos[0] + 1;j = pos[1] + 1;
	while (condition(i, j)){
		if (board[i][j] !== " "){
			if (!currPlayer.includes(board[i][j]))
				res.push([i, j]);
			break;
		}
		res.push([i, j])
		i++;j++;
	}

	return res;
}


// get all the Possibilities for a given piece
export const getPossibilities = (args) => {

	const [pos, board] = args;

	if (!pos || !pos.length)
		return [];

	const possibility = [];

	// get the selectd piece from the curret board
	switch(board[pos[0]][pos[1]]) {
		case "♖":
		case "♜":
			possibility.push(...getPossibilitiesForPawn(args));
			break;

		case "♘":
		case "♞":
			possibility.push(...getPossibilitiesForKnight(args));
			break;

		case "♝":
		case "♗":
			possibility.push(...getPossibilitiesForBishop(args));
			break;

		case "♙":
		case "♟":
			possibility.push(...possibilitiesForSoldier(args));
			break;

		case "♕":
		case "♛":
			possibility.push(...getPossibilitiesForPawn(args));
			possibility.push(...getPossibilitiesForBishop(args));
			break;

		case "♔":
		case "♚":
			possibility.push(...getPossibilitiesForKing(args));
			break;

		default:
			return [];
	}

	return possibility;
}