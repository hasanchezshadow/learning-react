import {useState} from 'react'
import './App.css'
import confetti from "canvas-confetti";

import {Square} from './components/Square.jsx'
import {TURNS} from "./constants.js";
import {checkEndGameFrom, checkWinnerFrom} from "./logic/board.js";
import {WinnerModal} from "./components/WinnerModal.jsx";

function App() {
    const initialData = Array(9).fill(null);
    // States
    const [board, setBoard] = useState([...initialData]);
    const [turn, setTurn] = useState(TURNS.X);
    // null =  no winner, false = draw
    const [winner, setWinner] = useState(null);

    const updateBoard = (index) => {
        // update not allowed
        if (board[index] || winner) return;
        // update board
        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard);

        // Check if we have a winner
        const newWinner = checkWinnerFrom(newBoard);
        if (newWinner) {
            confetti();
            return setWinner(newWinner);

        }  else if (checkEndGameFrom(newBoard)) {
            // game is over -> draw
            setWinner(false);
         }

        // todo separete new turn logic into a function
        // update turn
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn);
    };

    const resetGame = () => {
        setBoard([...initialData]);
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn);
        setWinner(null);

    }

    return (
        // todo create component for the board
        <main className={'board'}>
            <h1>tic tac toe</h1>
            <button onClick={resetGame}>Reset</button>
            <section className={'game'}>
                {
                    board.map((_, index) => {
                        return (
                            <Square
                                key={index}
                                index={index}
                                updateBoard={updateBoard}
                            >
                                {_}
                            </Square>
                        )
                    })
                }
            </section>

            <section className={'turn'}>
                <Square key={TURNS.X} isSelected={turn === TURNS.X}>
                    {TURNS.X}
                </Square>
                <Square key={TURNS.O} isSelected={turn === TURNS.O}>
                    {TURNS.O}
                </Square>
            </section>

            <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
        </main>
    )
}

export default App
