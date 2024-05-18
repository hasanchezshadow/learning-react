import {useEffect, useState} from "react";

export function LisOfMovies({movies}) {
    return (
        <ul className={'movies'}>
            {movies.map(movie =>
                <li key={movie.id} className={'movie'}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.posterUrl} alt={`${movie.title} poster`}/>
                </li>
            )}
        </ul>
    );
}

export function NoMoviesResult() {
    return (
        <p>Movies not found for this search!</p>
    );
}

export function Movies({movies, isFirstInput}) {
    const [hasMovies, setHasMovies] = useState(false);

    useEffect(() => {
        setHasMovies(movies.length > 0);
    }, [movies]);

    if (!hasMovies) return !isFirstInput ? (<NoMoviesResult/>) : (<></>);

    return (<LisOfMovies movies={movies}/>);

}
