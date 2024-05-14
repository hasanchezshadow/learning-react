import './App.css';
import {useCatImage} from "./hooks/use-cat-image.hook.js";
import {useCatFat} from "./hooks/use-cat-fat.hook.js";


export function App() {
    const {fact, factError, refreshRandomFact} = useCatFat();
    // Getting cat image when fact is changed
    const {catImageUrl, text,  catImageError} = useCatImage({fact});

    return (
        <main className={'container'}>
            <h1>Cats app</h1>

            <button onClick={refreshRandomFact}>Get new fact</button>
            {/*<section>*/}
            {fact && <p>{fact}</p>}
            {catImageUrl &&
                <img src={catImageUrl} alt={`Cat image with text: ${text}`}></img>}
            {/*</section>*/}
        </main>
    );
}
