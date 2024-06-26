import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE =  [
    {
        id: "1",
        name: "Yazman Rodriguez",
        email: "yazmanito@gmail.com",
        github: "yazmanito",
    },
    {
        id: "2",
        name: "John Doe",
        email: "leo@gmail.com",
        github: "leo",
    },
    {
        id: "3",
        name: "Haakon Dahlberg",
        email: "haakon@gmail.com",
        github: "midudev",
    },
];

export type UserId = string;

export interface User {
    name: string,
    email: string,
    github: string
}

export interface UserWithId extends User {
    id: UserId,
}


const initialState: UserWithId[] = (()=> {
    const persistedState = localStorage.getItem('__redux__state__');

    if (persistedState) {
        return JSON.parse(persistedState).users;
    }
    return DEFAULT_STATE;
})();

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
      addNewUser: (state, action: PayloadAction<User>) =>  {
          const id = crypto.randomUUID();
          state.push({id, ...action.payload});
      },
      deleteUserById: (state, action: PayloadAction<UserId>) =>  {
          const id = action.payload;
          return state.filter(user => user.id !== id);
      },
      rollbackAddedUser: (state, action: PayloadAction<UserWithId>) =>  {
          const userPayload = action.payload;
          return state.filter(user => user.id !== userPayload.id);
      },
      rollbackDeletedUser: (state, action: PayloadAction<UserWithId>) =>  {
          const userPayload = action.payload;
          const existUser = state.some(user => user.id === userPayload.id);
          if (!existUser) {
              state.push(userPayload);
          }
      }
  }
})

export default userSlice.reducer;
export const {addNewUser, deleteUserById, rollbackAddedUser, rollbackDeletedUser} = userSlice.actions
