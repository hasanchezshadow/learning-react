import './App.css'
import {ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import {useGetUsers} from "./hooks/useGetUsers";
import {SortBy, type User, type UserResponse} from "./models/models";
import {UsersList} from "./components/UsersList";

function App() {
    const {getUsers} = useGetUsers();
    const [users, setUsers] = useState<User[]>([]);
    const [showColors, setShowColors] = useState(false);
    const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
    const [filteredCountry, setFilteredCountry] = useState<string | null>(null);

    // useRef -> to save values that we want to share between renders, but when changed, do not re-render the component
    const originalUsers = useRef<User[]>([]);


    const toggleColors = () => {
        setShowColors(!showColors);
    }
    const toggleSortByCountry = () => {
        const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
        setSorting(newSorting);
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

    const handleChangeSort = (sort: SortBy) => {
        setSorting(sort);
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

        if (sorting === SortBy.NONE) return usersFilteredByCountry;


        //  Using new Js method toSorted
        // const compareProperties = {
        //     [SortBy.COUNTRY]: (a: User, b: User) => a.location.country.localeCompare(b.location.country),
        //     [SortBy.NAME]: (a: User, b: User) => a.name.first.localeCompare(b.name.first),
        //     [SortBy.LAST]: (a: User, b: User) => a.name.last.localeCompare(b.name.last),
        // }
        //
        // return usersFilteredByCountry.toSorted(compareProperties[sorting]);

        const compareProperties = {
            [SortBy.COUNTRY]: (user:User) => user.location.country,
            [SortBy.NAME]: (user: User) => user.name.first,
            [SortBy.LAST]: (user: User) => user.name.last,
        }
        return usersFilteredByCountry.toSorted((a, b) => {
            const extractProperty = compareProperties[sorting];
            return extractProperty(a).localeCompare(extractProperty(b));
        });

    }, [usersFilteredByCountry, sorting]);

    return (
        <div>
            <h1>Technical Test 55k</h1>
            <header>
                <button onClick={toggleColors}>Color rows</button>
                <button onClick={toggleSortByCountry}>{sorting === SortBy.COUNTRY ? 'No sort by Country' : 'Sort by Country'}</button>
                <button onClick={handleResetUsers}>Reset users</button>
                <input type="search" placeholder={'Enter the country'} onChange={filterByCountry}/>
            </header>
            <main>
                <p>Users: {users.length}</p>
                <UsersList users={sortedUsers} showColors={showColors} deleteUser={handleDeleteUser} changeSorting={handleChangeSort}/>
            </main>
        </div>
    )
}

export default App
