import {configureStore, Middleware, PayloadAction} from '@reduxjs/toolkit'
import usersReducer, {rollbackAddedUser, rollbackDeletedUser, User, UserId, UserWithId} from './users/slice'
import {toast} from "sonner";

export const persistenceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action);
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()));
};

export const syncWithDatabaseMiddleware: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action as PayloadAction<UserId | User> ;
  const previousState = store.getState();

  next(action);
  if (type === 'users/addNewUser') {
    fetch(`https://jsonplaceholder.typicode.com/users`, {method: 'POST', body: JSON.stringify(payload)})
        // .then(res => res.json())
        .then(res => {
          if (res.ok) {
            return toast.success(`User added correctly`);
          }
          throw new Error('Error adding user');
        })
        .catch((e) => {
          console.log('error => ',  e);
          toast.error('Error adding user');
          const {users} = store.getState();
          store.dispatch(rollbackAddedUser(users.at(-1) || users[users.length - 1]));
        });
  }
  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload as UserId;
    const userToRemove: UserWithId = previousState.users.find((user: UserWithId) => user.id === userIdToRemove);
    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {method: 'DELETE'})
        // .then(res => res.json())
        .then(res => {
          if (res.ok) {
            return toast.success(`User ${userIdToRemove} deleted correctly`);
          }
          throw new Error('Error deleting user');
        })
        .catch((e) => {
          console.log('error => ',  e);
          toast.error(`Error deleting user ${userIdToRemove}`);
          if (userToRemove) store.dispatch(rollbackDeletedUser(userToRemove));
        });
  }
};

export const store = configureStore({
  reducer: {
    users: usersReducer
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(persistenceLocalStorageMiddleware, syncWithDatabaseMiddleware),
})

// persistenceMiddleware.startListening({
//     actionCreator: action1,
//     effect: () => {},
// })

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
