import './App.css'
// import {useState, useRef, useEffect} from "react";
import {Movies} from "./components/Movie.jsx";
import {useMovies} from "./hooks/useMovies.js";
import {useSearchParam} from "./hooks/useSearchParam.js";
import {useCallback, useEffect, useState} from "react";
import useDebounce from "./hooks/useDebounce.js";

function App() {
    const [sort, setSort] = useState(false);

    const {searchParam, setSearchParam, error, isFirstInput} =  useSearchParam();
    const {movies, loading, moviesError, getMovies} = useMovies({searchParam, sort});
    // const inputRef = useRef();

    const debouncedMovie = useDebounce(searchParam, 500);
    useCallback(getMovies({searchParam: debouncedMovie}), [debouncedMovie]);

    // const debouncedMovie = useDebounce(searchParam, 500);
    // useEffect(() => {
    //     getMovies({searchParam: debouncedMovie});
    // }, [debouncedMovie]);


    // (Uncontrolled way)
    const handleSubmit = (event) => {
        event.preventDefault();

        // Using useRef
        // const inputSearchValue = inputRef.current?.value ;

        // Using event values
        // const fields = new FormData(event.target);
        // const inputSearchValue = fields.get('search').toString();
        // if (!inputSearchValue) return;
        // setSearchParam(inputSearchValue);

        getMovies({searchParam});
    }

    // (Controlled way)
    const handleChange = (event) => {
        const newSearchParam = event.target.value;

        if (newSearchParam.startsWith(' ')) return;

        setSearchParam(newSearchParam);
    }

    const handleSort = () => {
        setSort(!sort);
    }

    return (
        <div className={'page'}>
            <h1>Movie search</h1>
            <header>
                <form className={'form'} onSubmit={handleSubmit}>
                    {/*Using useRef*/}
                    {/*<input type="search" ref={inputRef} id={'search'} name={'search'} placeholder={'Avengers, Star Wars, The Matrix...'}/>*/}

                    {/*Uncontrolled way*/}
                    {/*<input type="search" id={'search'} name={'search'} placeholder={'Avengers, Star Wars, The Matrix...'}/>*/}

                    {/*Controller way*/}
                    <input style={
                        {
                            border: '1px solid transparent',
                            borderColor: error ? 'red' : 'transparent'
                        }
                    } value={searchParam} onChange={handleChange} type="search" id={'search'} name={'search'} placeholder={'Avengers, Star Wars, The Matrix...'}/>
                    <input type="checkbox" onChange={handleSort} checked={sort}/>
                    <button type={'submit'}>Search</button>
                </form>
                {error && <p style={{color: 'red'}}>{error}</p>}
            </header>
            <main>
                {
                    loading ? <p>Loading...</p> : <Movies movies={movies} isFirstInput={isFirstInput}/>
                }
            </main>
        </div>
    )
}

export default App
