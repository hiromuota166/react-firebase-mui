import React, { useState } from 'react';
import { Box } from '@mui/material';
import { SquareType, SquareProps, BoardType } from '../types/type';
import Title from './Title';

const Square: React.FC<SquareProps> = ({ value, onSquareClick }) => {
  return (
    <button
      style={{ width: '4rem', height: '4rem' }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

const Board: React.FC<BoardType> = ({ xIsNext, squares, onPlay }) => {

  const handleClick = (index: number) => {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice(); //イミュータビリティ。sliceはコピー
    if (xIsNext) {
      nextSquares[index] = 'X';
    } else {
      nextSquares[index] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className='flex flex-col'>
      <Title>{status}</Title>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 4rem)' }}>
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </Box>
    </div>
  );
};

const calculateWinner = (squares: SquareType[]): SquareType => {
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
      return squares[a];
    }
  }
  return null;
}

const Game: React.FC = () => {
  const [history, setHistory] = useState<SquareType[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: SquareType[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='flex'>
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
