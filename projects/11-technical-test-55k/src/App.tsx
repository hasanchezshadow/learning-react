import './App.css'
import {ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import {useGetUsers} from "./hooks/useGetUsers";
import {type User, type UserResponse} from "./models/user.model";
import {UsersList} from "./components/UsersList";

function App() {
    const {getUsers} = useGetUsers();
    const [users, setUsers] = useState<User[]>([]);
    const [showColors, setShowColors] = useState(false);
    const [sortByCountry, setSortByCountry] = useState(false);
    const [filteredCountry, setFilteredCountry] = useState<string | null>(null);

    // useRef -> to save values that we want to share between renders, but when changed, do not re-render the component
    const originalUsers = useRef<User[]>([]);


    const toggleColors = () => {
        setShowColors(!showColors);
    }
    const toggleSortByCountry = () => {
        setSortByCountry(prevState => !prevState);
    }

    const handleDeleteUser = (userId: string) => {
        setUsers(users.filter(user => user.login.uuid !== userId))
    }

    const handleResetUsers = () => {
        setUsers(originalUsers.current);
    }

    const filterByCountry = (event: ChangeEvent<HTMLInputElement>) => {
        const newSearchParam = event.target.value.trim();
        setFilteredCountry(newSearchParam);
    }

    useEffect(() => {
        getUsers().then((response: UserResponse) => {
            originalUsers.current = response.results;
            setUsers(response.results);
        });
    }, []);

    const usersFilteredByCountry = useMemo(() => {
        return typeof filteredCountry === "string" && filteredCountry.length > 0
            ? users.filter((user) => user.location.country.toLowerCase().includes(filteredCountry.toLowerCase()))
            : users;
    }, [users, filteredCountry]);

    const sortedUsers = useMemo(() => {
        //  Using sort
        // const sortedUsers = sortByCountry ? [...users].sort((a, b) => a.location.country.localeCompare(b.location.country)) : users;
        //  Using new Js method toSorted
        return sortByCountry
            ? usersFilteredByCountry.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
            : usersFilteredByCountry;
    }, [usersFilteredByCountry, sortByCountry]);

    return (
        <div>
            <h1>Technical Test 55k</h1>
            <header>
                <button onClick={toggleColors}>Color rows</button>
                <button onClick={toggleSortByCountry}>{sortByCountry ? 'No sort by Country' : 'Sort by Country'}</button>
                <button onClick={handleResetUsers}>Reset users</button>
                <input type="search" placeholder={'Enter the country'} onChange={filterByCountry}/>
            </header>
            <main>
                <p>Users: {users.length}</p>
                <UsersList users={sortedUsers} showColors={showColors} deleteUser={handleDeleteUser} />
            </main>
        </div>
    )
}

export default App
