import { createSlice, createAsyncThunk, Dispatch } from "@reduxjs/toolkit";
import { CreateJob, CreateUser, User } from "../../types";
import { setModalCreateUser, setModalNotification } from "./statusDisplaySloce";
import { log } from "console";

type JobState = {
    data: User[] | null,
    loading: {
        createUser: 'loading'| 'error'| 'done' |'none',
        fetchUsers: boolean
    }
};
const initialState: JobState = {
    data:null,
    loading:{
        createUser: 'none',
        fetchUsers: false
    }
};
type ResponseTypeUser = {
    data: null | User,
    statusCode: number;
    message: string;
}
type ResponseTypeUsers = {
    data: null | User[],
    statusCode: number;
    message: string;
}
export const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        setLoadingCreateUser: (state, action) => {
            state.loading.createUser = action.payload
        },
        setLoadingFetchUsers: (state, action) => {
            state.loading.fetchUsers = action.payload
        },
        setUsers:(state,action) => {
            state.data = action.payload
        },
        pushOneUser:(state,action) => {            
            state.data?.push(action.payload)
        }   
    },
    extraReducers: (builder) => {
        builder
        .addCase(
            submitCreateUser.fulfilled,
            (state, action) => {
                if(!action.payload?.data) {
                    state.loading.createUser = 'error'
                    setModalNotification({notify:'created new user error', status: false})
                    return
                }
                state.loading.createUser = 'done'
                state.data?.push(action.payload.data)     
            }
        )

        .addCase(
            fetchUserByAdmin.fulfilled, 
            (state, action) => { 
                
                if(!action.payload) return
                if(action.payload.length < 1) {
                    state.data = null 
                    return
                }
                state.data = action.payload
            }
        )

        .addCase(
            upDateUser.fulfilled, 
            (state, action) => {               
                state.data = action.payload
            }
        )
 
    }

 
});

export const submitCreateUser = createAsyncThunk<ResponseTypeUser | null,CreateUser>(
    'users/submitCreateUser',
    async (createUser: CreateUser,{dispatch}) => {
        
        const token = localStorage.getItem('jwtToken'); 
        dispatch(setLoadingCreateUser('loading'))
        try {
            const res= await fetch('http://localhost:3001/users',
                {   
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` 
                    },
                    body: JSON.stringify(createUser)
                }
            );
            
            if(!res.ok) {
                dispatch(setModalNotification({notify:'create new user error', status: false}))
                return null
            };
                 
            const responseData: Promise<ResponseTypeUser> = await res.json()
            dispatch(setModalNotification({notify:'create new user success', status: true}));
            dispatch(setModalCreateUser(""))           
            return responseData

        } catch (error) {
            dispatch(setLoadingCreateUser('error'))
            dispatch(setModalNotification({notify:'create new user error', status: false}))
            return  null  
        }
    }
);

export const fetchUserByAdmin = createAsyncThunk<User[]| null, any>(
    'users/fetchUserByAdmin',
    async (title: string,{dispatch}) => {       
        const token = localStorage.getItem('jwtToken'); 
        dispatch(setLoadingFetchUsers(true))
        try {
            const res= await fetch('http://localhost:3001/users',
                {   
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` 
                    },
                }
            );
            
            const responseData: ResponseTypeUsers = await res.json()
            if(!await responseData.data) return null
            dispatch(setLoadingFetchUsers(false))
            return await responseData.data
            
        } catch (error) {
            dispatch(setLoadingFetchUsers(false))
            return null
        }
    }
);

type DataUpdateUser = {
    action: 'DELETE' | 'UPDATE' | 'COMPLETE',
    user: User
};
export const upDateUser = createAsyncThunk<User[]| null, DataUpdateUser>(
    'users/updateUser',
    async (updateUser: DataUpdateUser, {dispatch}) => {       
        const token = localStorage.getItem('jwtToken'); 
        
        try {
            const res= await fetch(`http://localhost:3001/users/${updateUser.user.id}`,
                {   
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` 
                    },
                }
            );
            const responseData = await res.json(); 

            if(!await responseData.data) return null;
            dispatch(setLoadingFetchUsers(false));
            dispatch(setModalNotification({notify:'Successfully DELETE User', status: true}));
            return await responseData.data
            
        } catch (error) {
            dispatch(setModalNotification({notify:'Successfully ERROR User', status: false}));
            dispatch(setLoadingFetchUsers(false));
            return null
        }
    }
);

const  {reducer,actions} = usersSlice;
export const {
    setLoadingCreateUser,
    setLoadingFetchUsers, 
    setUsers, 
    pushOneUser
} = actions;
export default reducer