import {useEffect, useState} from "react";
import {getMovies} from "../services/movies.service.js";

export function useMovies({searchParam}) {
    const [movies, setMovies] = useState([]);
    const [moviesError, setMoviesError] = useState('');

    useEffect(() => {
        if (!searchParam) return;

        getMovies(searchParam)
            .then(data => {
                setMovies(data);
            })
            .catch((e) => setMoviesError(e.message));
    }, [searchParam]);

    return {movies, moviesError};
}
