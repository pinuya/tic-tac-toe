"use client";

import type React from "react";
import { useState } from "react";
import "./TicTacToe.css";

const JogoDaVelha: React.FC = () => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [gameCount, setGameCount] = useState<number>(0);

  const winner = calculateWinner(board);
  const status = winner
    ? `Vencedor: ${winner}`
    : board.every(Boolean)
    ? "Empate!"
    : `Próximo jogador: ${xIsNext ? "X" : "O"}`;

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderCell = (index: number) => (
    <div className="celula" onClick={() => handleClick(index)}>
      {board[index]}
    </div>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameCount(0);
  };

  const newGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameCount(gameCount + 1);
  };

  return (
    <div className="jogo-da-velha">
      <h1 className="titulo">Jogo da Velha</h1>
      <div className="status">{status}</div>
      <div className="tabuleiro">
        {board.map((_, index) => renderCell(index))}
      </div>
      <div className="botoes">
        <button className="botao resetar" onClick={resetGame}>
          Resetar
        </button>
        <button className="botao jogar-novamente" onClick={newGame}>
          Jogar Novamente
        </button>
      </div>
      <div className="contador">Partidas jogadas: {gameCount}</div>
      <div className="elementos-fundo">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="circulo"></div>
        ))}
        {[...Array(5)].map((_, index) => (
          <div key={index} className="x"></div>
        ))}
      </div>
    </div>
  );
};

function calculateWinner(squares: Array<string | null>): string | null {
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

export default JogoDaVelha;
