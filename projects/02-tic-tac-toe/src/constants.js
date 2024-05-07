export const TURNS = {
    X: '🞪',
    O: 'Θ',
};


export const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export const STORAGE_KEYS = {
    TURN: 'turn',
    BOARD: 'board'
}

export const INITIAL_DATA = Array(9).fill(null);
