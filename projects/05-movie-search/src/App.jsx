import './App.css'
import {useState} from "react";
import {Movies} from "./components/Movie.jsx";
import {useMovies} from "./hooks/useMovies.js";

function App() {
    const [searchParam, setSearchParam] = useState('');
    // const {movies} = useMovies({searchParam});
    const {movies} = useMovies({searchParam});


    const handleClick = () => {
        const inputSearchValue = document.getElementById('search').value;
        if (!inputSearchValue) return;

        setSearchParam(inputSearchValue);
    }

    return (
        <div className={'page'}>
            <h1>Movie search</h1>
            <header>
                <form action="#" className={'form'}>
                    <input type="search" id={'search'} placeholder={'Avengers, Star Wars, The Matrix...'}/>
                    <button type={'button'} onClick={handleClick}>Search</button>
                </form>
            </header>
            <main>
                <Movies movies={movies}/>
            </main>
        </div>
    )
}

export default App
