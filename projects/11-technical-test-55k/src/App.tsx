import './App.css'
import {useEffect, useState} from "react";
import {useGetUsers} from "./hooks/useGetUsers.ts";
import {type User, type UserResponse} from '../models/user.model.ts';

function App() {
    const {getUsers} = useGetUsers();
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        getUsers().then((response: UserResponse) => setUsers(response.results));
    }, []);

    return (
        <>
            <div>
                <h1>Technical Test 55k</h1>
                <p>Users: {users.length}</p>
            </div>
        </>
    )
}

export default App
