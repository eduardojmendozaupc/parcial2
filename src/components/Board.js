import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
  const winInfo = calculateWinner(squares);
  const winLine = winInfo.line;

  function handleClick(i) {
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    let row = 1 + Math.floor(i / 3);
    let col = 1 + (i % 3);

    let coordinates = {};
    coordinates.row = row;
    coordinates.col = col;

    let obj = {};
    obj.squares = nextSquares;
    obj.coordinates = coordinates;

    onPlay(obj);
  }

  const winner = calculateWinner(squares).winner;
  let status;
  console.log(winner);
  if (winner) {
    status = "Ganador: " + winner;
  } else {
    if (winInfo.isDraw) {
      status = "Empate";
    } else {
      status = "Siguiente Jugador: " + (xIsNext ? "X" : "O");
    }
  }

  let board = [];
  for (let index = 0; index < 3; index++) {
    let cols = [];
    for (let j = 0; j < 3; j++) {
      let pos = index * 3 + j;
      cols.push(<Square value={squares[pos]} onSquareClick={() => handleClick(pos)} key={pos} highlight={winLine && winLine.includes(pos)} />);
    }
    board.push(
      <div key={index} className="board-row">
        {cols}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {board}
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }

  let isDraw = true;
  for (let j = 0; j < squares.length; j++) {
    if (squares[j] === null) {
      isDraw = false;
      break;
    }
  }

  return { winner: null, line: null, isDraw: isDraw };
}
