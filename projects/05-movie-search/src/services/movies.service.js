import {API_DATA} from "../constants/constants.js";

export async function searchMovies({searchParam}) {
    const response = await fetch(`${API_DATA.BASE_URL}?apikey=${API_DATA.KEY}&s=${searchParam}`)
    if (!response.ok) {
        throw new Error('Error fetching movies');
    }

    const data = await response.json();
    const {Search} = data;

    if (!Search) return [];

    return Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            posterUrl: movie.Poster,
        })
    );
}
