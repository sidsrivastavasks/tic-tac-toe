import React from "react";
import Square from "./Square";
import { useState } from "react";

const Board = () => {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    function handelClick(index) {
        if (squares[index] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();

        if (xIsNext) {
            nextSquares[index] = "X";
        } else {
            nextSquares[index] = "O";
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <div data-testid="board">
            <div className="status" data-testid="status">
                {status}
            </div>
            <div className="board-row">
                <Square
                    value={squares[0]}
                    onSquareClick={() => handelClick(0)}
                />
                <Square
                    value={squares[1]}
                    onSquareClick={() => handelClick(1)}
                />
                <Square
                    value={squares[2]}
                    onSquareClick={() => handelClick(2)}
                />
            </div>
            <div className="board-row">
                <Square
                    value={squares[3]}
                    onSquareClick={() => handelClick(3)}
                />
                <Square
                    value={squares[4]}
                    onSquareClick={() => handelClick(4)}
                />
                <Square
                    value={squares[5]}
                    onSquareClick={() => handelClick(5)}
                />
            </div>
            <div className="board-row">
                <Square
                    value={squares[6]}
                    onSquareClick={() => handelClick(6)}
                />
                <Square
                    value={squares[7]}
                    onSquareClick={() => handelClick(7)}
                />
                <Square
                    value={squares[8]}
                    onSquareClick={() => handelClick(8)}
                />
            </div>
        </div>
    );
};

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
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}

export default Board;
