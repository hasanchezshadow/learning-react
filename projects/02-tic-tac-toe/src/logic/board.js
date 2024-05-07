import {TURNS, WINNER_COMBOS} from "../constants.js";

export const checkWinnerFrom = (boardToCheck) => {
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

export const checkEndGameFrom = (boardToCheck) => {
    // we can also use the function every
    return !boardToCheck.includes(null);
}

export const getCurrentTurn = (turn) => {
    return turn === TURNS.X ? TURNS.O : TURNS.X
}
