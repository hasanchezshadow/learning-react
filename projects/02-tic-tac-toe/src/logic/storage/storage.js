import {STORAGE_KEYS} from "../../constants.js";

export const resetGameFromStorage = () => {
    for (let key in STORAGE_KEYS) {
        localStorage.removeItem(STORAGE_KEYS[key]);
    }
}

export const saveIntoStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const getFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || null;
}

export const saveGameToStorage = ({board, turn}) => {
    saveIntoStorage(STORAGE_KEYS.BOARD, board);
    saveIntoStorage(STORAGE_KEYS.TURN, turn);
}
