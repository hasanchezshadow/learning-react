import {useEffect, useState} from "react";
import './App.css';
import {getCatImageFromText, getRandomFact} from "./services/facts.service.js";


export function App() {
    const [fact, setFact] = useState('');
    const [factError, setFactError] = useState('');
    const [catImageUrl, setCatImageUrl] = useState('');

    const manageRandomFact = () => {
        getRandomFact()
            // .then(setFact)
            .then((newFact) => setFact(newFact))
            .catch((e) => setFactError(e.message));
    }

    // Getting fact on page load
    useEffect(manageRandomFact, []);

    // Getting cat image when fact is changed
    useEffect(() => {
        if (!fact) return;

        const text = fact.split(' ', 3).join(' ');
        getCatImageFromText(text)
            .then((url) => setCatImageUrl(url))
            .catch((e) => setFactError(e.message));

    }, [fact]);

    return (
        <main className={'container'}>
            <h1>Cats app</h1>

            <button onClick={manageRandomFact}>Get new fact</button>
            {/*<section>*/}
            {fact && <p>{fact}</p>}
            {catImageUrl &&
                <img src={`${CATAAS_BASE_URL}${catImageUrl}`} alt={`Cat image with text`}></img>}
            {/*</section>*/}
        </main>
    );
}
