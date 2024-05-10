import {useEffect, useState} from "react";
import './App.css'

export const APIS = {
    FACT: 'https://catfact.ninja/fact',
    CATAAS: 'https://cataas.com/cat/says/{firstWord}?fontSize=50&fontColor=red&json=true',
    CATAAS_BASE_URL: 'https://cataas.com'
}


export function App() {
    const [fact, setFact] = useState('');
    const [factError, setFactError] = useState('');
    const [catImageUrl, setCatImageUrl] = useState('');

    // Getting fact on page load
    useEffect(() => {
        fetch(APIS.FACT)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error fetching fact');
                }
                return response.json();
            })
            .then((data) => {
                const {fact} = data;
                setFact(fact);
            })
            .catch((e) => setFactError(e.message));
    }, []);

    // Getting cat image when fact is changed
    useEffect(() => {
        if (!fact) return;

        const firstWord = fact.split(' ', 3).join(' ');
        fetch(`${APIS.CATAAS}`.replace('{firstWord}', firstWord))
            .then((response) => response.json())
            .then((data) => setCatImageUrl(data.url));

    }, [fact]);

    return (
        <main className={'container'}>
            <h1>Cats app</h1>
            {/*<section>*/}
            {fact && <p>{fact}</p>}
            {catImageUrl &&
                <img src={`${CATAAS_BASE_URL}${catImageUrl}`} alt={`Cat image with text: ${firstWord}`}></img>}
            {/*</section>*/}
        </main>
    );
}
