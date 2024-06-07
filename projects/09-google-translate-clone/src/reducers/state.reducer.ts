import {type Action, type State} from "../types/types";

// 1 - Create Initial State
export const initialState: State = {
    fromLanguage: 'auto',
    toLanguage: window.navigator.language || 'en',
    fromText: '',
    resultText: '',
    loading: false,
};

//  2 - Create a Reducer
// export function stateReducer(state: typeof initialState, action: Action): State {
export function stateReducer(state: State, action: Action): State {
    const {type: actionType} = action;

    if (actionType === 'INTERCHANGE_LANGUAGES') {
        return {
            ...state,
            fromLanguage: state.toLanguage,
            toLanguage: state.fromLanguage
        };
    }

    if (actionType === 'SET_FROM_LANGUAGE') {
        return {
            ...state,
            fromLanguage: action.payload
        };
    }

    if (actionType === 'SET_TO_LANGUAGE') {
        return {
            ...state,
            toLanguage: action.payload
        };
    }

    if (actionType === 'SET_FROM_TEXT') {
        return {
            ...state,
            loading: true,
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
