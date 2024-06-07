import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useStore} from "./hooks/useStore.ts";

function App() {
    const {
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
    } = useStore();

    return (
        <>
            <h1>
                Google Translate
            </h1>
        </>
    )
}

export default App
