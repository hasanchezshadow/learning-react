import {useEffect, useRef, useState, useMemo, useCallback} from "react";
import {searchMovies} from "../services/movies.service.js";

export function useMovies({searchParam, sort}) {
    const [movies, setMovies] = useState([]);
    const [moviesError, setMoviesError] = useState('');
    const [loading, setLoading] = useState(false);

    const previousSearch = useRef('');

    const getMovies = useCallback(({searchParam}) => {
            if (!searchParam || searchParam === previousSearch.current) return;

            setLoading(true);
            setMoviesError('');
            previousSearch.current = searchParam;

            searchMovies({searchParam})
                .then(data => {
                    setMovies(data);
                })
                .catch((e) => {
                    setMoviesError(e.message);
                })
                .finally(() => setLoading(false));
        }, []);


    const sortedMovies = useMemo(() => {
        return sort ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies;
    }, [sort, movies]);

    return {movies: sortedMovies, moviesError, loading, getMovies};
}
