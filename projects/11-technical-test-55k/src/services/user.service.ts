import {API_URL} from "../consts/consts";
import {UserResponse} from "../models/models";

export async function getUsers({pageParam}) {
    const result: UserResponse = await fetch(`${API_URL}?results=10&seed=shadowwalker&page=${pageParam}`)
        .then(r => {
            if (!r.ok) throw new Error('Request error');
            return r.json();
        });

    const currentPage = result.info.page;
    const nextPage = currentPage > 3 ? undefined : currentPage + 1;

    return {users: result.results, nextPage};
}
