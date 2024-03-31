import { createSlice, createAsyncThunk, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { CreateJob, CreateUser, User } from "../../types";
import { setModalCreateUser, setModalNotification } from "./statusDisplaySloce";
import { log } from "console";

interface UsersType {
    data: User[] | null,
    loading: Boolean

};
const initialState: UsersType = {
    data: null,
    loading: false

};

export const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.data = action.payload
        },

    },
   
 
});



const  {reducer,actions} = usersSlice;
export const {
    setUsers,
} = actions;
export default reducer