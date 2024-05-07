import {useState} from 'react'
import './App.css'
import confetti from "canvas-confetti";

import {Square} from './components/Square.jsx'
import {INITIAL_DATA, STORAGE_KEYS, TURNS} from "./constants.js";
import {
    checkEndGameFrom,
    checkWinnerFrom,
    getCurrentTurn,
} from "./logic/board.js";
import {
    resetGameFromStorage,
    getFromStorage, saveGameToStorage,
} from "./logic/storage/storage.js";
import {WinnerModal} from "./components/WinnerModal.jsx";

function App() {
    // States
    const [board, setBoard] = useState(() => {
        const boardFromStorage = getFromStorage(STORAGE_KEYS.BOARD);
        return boardFromStorage ?? [...INITIAL_DATA];
    });
    const [turn, setTurn] = useState(() => {
        const turnFromStorage = getFromStorage(STORAGE_KEYS.TURN);
        return getCurrentTurn(turnFromStorage) ?? TURNS.X;
    });
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

        } else if (checkEndGameFrom(newBoard)) {
            // game is over -> draw
            setWinner(false);
        }

        // save game changes
        saveGameToStorage({board: newBoard, turn});

        // update turn
        const newTurn = getCurrentTurn(turn);
        setTurn(newTurn);
    };

    const resetGame = () => {
        setBoard([...INITIAL_DATA]);
        const newTurn = getCurrentTurn(turn);
        setTurn(newTurn);
        setWinner(null);
        resetGameFromStorage();
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
