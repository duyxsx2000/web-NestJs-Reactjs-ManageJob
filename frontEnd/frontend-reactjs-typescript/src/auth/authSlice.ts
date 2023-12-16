import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserAuth } from "../types";



const data: UserAuth = {
    email:'',
    role:'',
    name:'',
    id:1,
};

const initialState: AuthState = {
    profile: data,
    test: '',
    loading:'none',
    token:''
};

type ResToken = {
    access_token: string,
};
type TypeForm = {
    password: string,
    email: string
};

interface AuthState {
    profile: UserAuth |  null,
    test: string,
    loading: "done" | "none" | "loading",
    token: string
};

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = 'loading'              
        },

        upDataAuth: (state, action) => {
            state.profile = action.payload
        }
    },
    extraReducers: (builder) => {

        builder
        .addCase(
            fetchtokenByUser.fulfilled, 
            (state, action) => {
                if(!action.payload) return undefined
                const token = action.payload.access_token
                state.token = token;
                state.loading = 'done'
            }
        )
        .addCase(
            fetchProfileByToken.fulfilled, 
            (state, action) => {
                if(!action.payload) {
                    console.log('gg'); 
                    state.loading = "none"
                    return undefined
                }
                console.log(123);
                
                state.profile = action.payload 
                state.loading = 'done' 
                console.log(123);
            }
        )
      },
});



export const fetchtokenByUser = createAsyncThunk<ResToken |  null, TypeForm>(
    'auth/fetchtokenByUser',
    async (dataLogin: TypeForm,{dispatch}) => {

        dispatch(setLoading('loading'))
        try {
            const res = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(dataLogin)
            });
            const data: Promise<ResToken>= await res.json()
            localStorage.setItem('jwtToken', (await data).access_token)
            return data
        } catch (error) {
            console.log(error,'error');
            return  null
        }
    }
)

export const fetchProfileByToken = createAsyncThunk<UserAuth | null, string>(
    'auth/fetchProfileByToken',
    async (token: string, {dispatch}) => {
        dispatch(setLoading('loading'))
        try {
            console.log('ế');
            
            const res = await fetch('http://localhost:3001/auth/profile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(!res.ok) return null
            
            const profile: Promise<UserAuth> = await res.json()    
            console.log(profile,"0");
                   
            return profile
        } catch (error) {
            return null
        }
        
    }
)

const  {reducer,actions} = authSlice;
export const {setLoading} = actions;
export default reducer