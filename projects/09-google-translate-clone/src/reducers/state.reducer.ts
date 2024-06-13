import {type Action, type State} from "../types/types";
import {AUTO_LANGUAGE} from "../constants/constants.ts";

// 1 - Create Initial State
export const initialState: State = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    resultText: '',
    loading: false,
};

//  2 - Create a Reducer
// export function stateReducer(state: typeof initialState, action: Action): State {
export function stateReducer(state: State, action: Action): State {
    const {type: actionType} = action;

    if (actionType === 'INTERCHANGE_LANGUAGES') {
        if (state.fromLanguage === AUTO_LANGUAGE) return state;

        const loading = state.fromText !== '';

        return {
            ...state,
            fromLanguage: state.toLanguage,
            toLanguage: state.fromLanguage,
            loading,
            resultText: ''
        };
    }

    if (actionType === 'SET_FROM_LANGUAGE') {
        if (state.fromLanguage === action.payload) return state;

        const loading = state.fromText !== '';

        return {
            ...state,
            fromLanguage: action.payload,
            resultText: '',
            loading
        };
    }

    if (actionType === 'SET_TO_LANGUAGE') {
        if (state.toLanguage === action.payload) return state;

        const loading = state.fromText !== '';

        return {
            ...state,
            toLanguage: action.payload,
            resultText: '',
            loading
        };
    }

    if (actionType === 'SET_FROM_TEXT') {
        const loading = action.payload !== '';
        return {
            ...state,
            loading,
            fromText: action.payload,
            resultText: ''
        };
    }

    if (actionType === 'SET_RESULT') {
        return {
            ...state,
            loading: false,
            resultText: action.payload
        };
    }

    return state;
}
