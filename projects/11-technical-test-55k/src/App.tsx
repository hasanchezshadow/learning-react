import './App.css'
import {ChangeEvent, useMemo, useState} from "react";
import {useUsers} from "./hooks/useUsers";
import {SortBy, type User} from "./models/models";
import {UsersList} from "./components/UsersList";
import {Results} from "./components/Results";

function App() {
    const {isLoading, isError, users, refetch, fetchNextPage, hasNextPage} = useUsers();

    const [showColors, setShowColors] = useState(false);
    const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
    const [filteredCountry, setFilteredCountry] = useState<string | null>(null);

    // useRef -> to save values that we want to share between renders, but when changed, do not re-render the component
    // const originalUsers = useRef<User[]>([]);


    const toggleColors = () => {
        setShowColors(!showColors);
    }
    const toggleSortByCountry = () => {
        const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
        setSorting(newSorting);
    }

    const handleDeleteUser = (userId: string) => {
        // setUsers(users.filter(user => user.login.uuid !== userId))
    }

    const handleResetUsers = () => {
        // setUsers(originalUsers.current);
        refetch();
    }

    const filterByCountry = (event: ChangeEvent<HTMLInputElement>) => {
        const newSearchParam = event.target.value.trim();
        setFilteredCountry(newSearchParam);
    }

    const handleChangeSort = (sort: SortBy) => {
        setSorting(sort);
    }

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
            [SortBy.COUNTRY]: (user: User) => user.location.country,
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
            <Results/>
            <header>
                <button onClick={toggleColors}>Color rows</button>
                <button
                    onClick={toggleSortByCountry}>{sorting === SortBy.COUNTRY ? 'No sort by Country' : 'Sort by Country'}</button>
                <button onClick={handleResetUsers}>Reset users</button>
                <input type="search" placeholder={'Enter the country'} onChange={filterByCountry}/>
            </header>
            <main>
                {users.length > 0 &&
                    <UsersList users={sortedUsers} showColors={showColors} deleteUser={handleDeleteUser}
                               changeSorting={handleChangeSort}/>
                }
                {isLoading && <strong>Loading...</strong>}
                {!isLoading && isError && <p>An error has occurred</p>}
                {!isLoading && !isError && users.length === 0 && <p>No users to show</p>}
                {!isLoading && !isError && hasNextPage && <button onClick={() => fetchNextPage()}>Load more</button>}
            </main>
        </div>
    )
}

export default App
