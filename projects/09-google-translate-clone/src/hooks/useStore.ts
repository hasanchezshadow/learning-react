import {initialState, stateReducer} from "../reducers/state.reducer.ts";
import {useReducer} from "react";
import {FromLanguage, Language} from "../types/types";


export function useStore() {
    // 3 - Use reduce hook
    const [{
        fromLanguage,
        fromText,
        loading,
        resultText,
        toLanguage
    }, dispatch] = useReducer(stateReducer, initialState, () => initialState);

    const interchangeLanguages = () => dispatch({type: 'INTERCHANGE_LANGUAGES'});
    const setFromLanguage = (payload: FromLanguage) => dispatch({type: 'SET_FROM_LANGUAGE', payload});
    const setToLanguage = (payload: Language) => dispatch({type: 'SET_TO_LANGUAGE', payload});
    const setFromText = (payload: string) => dispatch({type: 'SET_FROM_TEXT', payload});
    const setResult = (payload: string) => dispatch({type: 'SET_RESULT', payload});


    return {
        fromLanguage,
        fromText,
        loading,
        resultText,
        toLanguage,
        interchangeLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult,
    };
}
