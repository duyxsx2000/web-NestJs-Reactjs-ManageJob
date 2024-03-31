import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateAdminAccount, UserAuth } from "../types";
import { setModalNotification } from "../redux/slices/statusDisplaySloce";



const data: UserAuth = {
    email:'',
    role:'',
    name:'',
    idUser:'',
};

const initialState: AuthState = {
    profile: data,
    test: '',
    loading: 'none',
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
    loading: "done" | "none" | "loading" | null,
    token: string
};

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            console.log(action.payload,'pl');
            
            state.loading = action.payload              
        },

        setLoadingNone:(state, action) => {
            state.loading = 'none'
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
                console.log(action.payload,'action');
                      
                if(!action.payload) return undefined
                const token = action.payload.access_token
                state.token = token;
                state.loading = 'loading'
            }
        )

        .addCase(
            fetchProfileByToken.fulfilled, 
            (state, action) => {
                if(!action.payload) {
                    state.loading = "none"
                    return undefined
                };
                                
                state.profile = action.payload 
                state.loading = 'done' 
            }
        )
      },
});



export const fetchtokenByUser = createAsyncThunk<ResToken |  null, TypeForm>(
    'auth/fetchtokenByUser',
    async (dataLogin: TypeForm,{dispatch}) => {
        console.log(dataLogin);
        
        try {
            const res = await fetch('http://localhost:3002/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(dataLogin)
            });
            if(!res.ok) {
                dispatch(setModalNotification({notify: 'sign in error', status: false}));
                return null
            }
            
            const data: Promise<ResToken> = await res.json()
            if(!(await data).access_token) { 
                dispatch(setModalNotification({notify: 'sign in error', status: false}));
                return null
            }
            localStorage.setItem('jwtToken', (await data).access_token)
            // dispatch(setLoading('done'))
            dispatch(setModalNotification({notify: 'Sign success', status: true}));
            return {
                access_token: (await data).access_token
            }
        } catch (error) {
            console.log(error,'error');
            return  null
        }
    }
);

export const fetchProfileByToken = createAsyncThunk<UserAuth | null, string>(
    'auth/fetchProfileByToken',
    async (token: string, {dispatch}) => {
        
        try {  

            const res = await fetch('http://localhost:3002/auth/profile', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(!res.ok) {
                dispatch(setLoading('none'))
                return null
            };

            const profile: Promise<UserAuth> = await res.json() ; 
            dispatch(setLoading('done'));

            return profile;
        } catch (error) {
            return null
        }
        
    }
);



export const createNewAdminforCompany = createAsyncThunk<any, CreateAdminAccount>(
    'auth/createNewAdminforCompany',
    async (createAdminAccount: CreateAdminAccount,{dispatch}) => {
        console.log(createAdminAccount,'account');
        const accountAdmin = {
            ...createAdminAccount,
            role: 'admin'
        }
        try {
            const res = await fetch('http://localhost:3002/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(accountAdmin)
            });

            if(!res.ok) {
                dispatch(setModalNotification({notify: 'create error', status: false}))
                return null
            };
            dispatch(setModalNotification({notify: 'create succes', status: true}));
            dispatch(setLoading('signIn'))

            const data = await res.json()
            return data
        } catch (error) {
            console.log(error,'error');
            return  null
        }
    }
);

const  {reducer,actions} = authSlice;
export const {setLoading, setLoadingNone} = actions;
export default reducer