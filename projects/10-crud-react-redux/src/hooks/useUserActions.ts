import {useAppDispatch} from "./store.ts";
import {addNewUser, deleteUserById, User, UserId} from "../store/users/slice.ts";

export function useUserActions() {
    const dispatch = useAppDispatch()

    const addUser = (user: User) => {
        dispatch(addNewUser(user));
    }

    const removeUser = (userId: UserId) => {
        dispatch(deleteUserById(userId));
    }
    return {addUser, removeUser};
}
