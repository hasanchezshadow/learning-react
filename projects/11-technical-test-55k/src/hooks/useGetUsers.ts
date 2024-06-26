import {API_URL} from "../consts/consts.ts";

export function useGetUsers() {
    const getUsers = async () => {
        return await fetch(`${API_URL}?results=100`).then(r => r.json()).catch(() => {
            throw new Error('Error fetching users');
        });
    }

    return {getUsers}
}
