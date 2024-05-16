import {useEffect, useState} from "react";

export function LisOfMovies({movies}) {
    return (
        <ul>
            {movies.map(movie =>
                <li key={movie.id}>
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
        <p>Movies not found for this search</p>
    );
}

export function Movies({movies}) {
    const [hasMovies, setHasMovies] = useState(false);

    useEffect(() => {
        setHasMovies(movies.length > 0);
    }, [movies]);

    if (!hasMovies) return (<NoMoviesResult/>);

    return (<LisOfMovies movies={movies}/>);

}
