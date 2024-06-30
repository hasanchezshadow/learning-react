import {SortBy, User} from "../models/models";

interface Props {
    changeSorting: (sort: SortBy) => void
    deleteUser: (userId: string) => void;
    showColors: boolean;
    users: User[];
}

export function UsersList({changeSorting, deleteUser, showColors, users}: Props) {

    return (
        <table>
            <thead>
            <tr>
                <th>Picture</th>
                <th className={'pointer'} onClick={() => changeSorting(SortBy.NAME)}>Name</th>
                <th className={'pointer'} onClick={() => changeSorting(SortBy.LAST)}>Lastname</th>
                <th className={'pointer'} onClick={() => changeSorting(SortBy.COUNTRY)}>Country</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody className={showColors ? 'table--showColors' : ''}>
            {
                users.map((user) => {
                    // const backgroundColor = index % 2 === 0 ? '#333' : '#555';
                    // const color = showColors ? backgroundColor : 'transparent';

                    return (
                        // <tr key={user.login.uuid} style={{backgroundColor: color}} className={'colored-row'}>
                        <tr key={user.login.uuid} className={'colored-row'}>
                            <td><img src={user.picture.thumbnail} alt={`Picture of ${user.name.first}`}/></td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.location.country}</td>
                            <td>
                                <button onClick={() => deleteUser(user.login.uuid)}>Delete</button>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}
