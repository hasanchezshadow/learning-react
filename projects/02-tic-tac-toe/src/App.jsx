import {useState} from 'react'
import './App.css'

const TURNS = {
    X: 'x',
    O: 'o',
};

const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const Square = ({children, updateBoard, index, isSelected}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`;
    const handleClick = () => {
        updateBoard(index);
    }
    return (
        <div className={className} key={index} onClick={handleClick}>
            {children}
        </div>
    )
};

function App() {
    // States
    const [board, setBoard] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState(TURNS.X);
    // null =  no winner, false = draw
    const [winner, setWinner] = useState(null);

    const checkWinner = (boardToCheck) => {
        // We check all winning combinations to know if X or O won.
        for (let combo of WINNER_COMBOS) {
            const [a, b, c] = combo;
            if (
                boardToCheck[a] && // 0 -> X or O
                boardToCheck[a] === boardToCheck[b] &&
                boardToCheck[a] === boardToCheck[c]
            ) {
                return boardToCheck[a]; // X or O
            }
        }

        // No winner
        return null;
    }

    const updateBoard = (index) => {
        // update not allowed
        if (board[index] || winner) return;
        // update board
        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard);

        // Check if we have a winner
        const newWinner = checkWinner(newBoard);
        if (newWinner) {
            return setWinner(newWinner);

        }

        // update turn
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn);
    };

    return (
        <main className={'board'}>
            <h1>tic tac toe</h1>
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
        </main>
    )
}

export default App
