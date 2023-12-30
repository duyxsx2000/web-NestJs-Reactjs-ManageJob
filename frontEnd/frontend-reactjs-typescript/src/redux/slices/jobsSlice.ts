import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateJob, JobType, ResponseType } from "../../types";
import { setModalNotification } from "./statusDisplaySloce";

type JobState = {
    jobs: JobType[] | null,
    loading: boolean,
    status: string
}
const initialState: JobState = {
    jobs: null,
    loading: false,
    status:'none'
};

type ResponseJobs = {
    data: JobType[],
    message: string,
    statusCode: number
}

export const jobsSlice = createSlice({
    name:'jobs',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            
        },

        upDataAuth: (state, action) => {
           
        }
    },
    extraReducers: (builder) => {

        builder
        .addCase(
            postDataCreateJob.fulfilled, 
            (state, action) => {
                if(!action.payload) {
                    return    
                }

            }
        )
        .addCase(
            fetchJobs.fulfilled, 
            (state, action) => {
                if(!action.payload) {
                    console.log('pay1');
                    
                    return    
                }
                console.log(action.payload);
                
                state.jobs = action.payload

            }
        )
    },
});



export const postDataCreateJob = createAsyncThunk<ResponseType |  null, CreateJob>(
    'auth/postDataCreateJob',
    async (createJob: CreateJob,{dispatch}) => {

        const token = localStorage.getItem('jwtToken'); 
        dispatch(setLoading('loading'))
        try {
            const res = await fetch('http://localhost:3001/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`    
                },
                body: JSON.stringify(createJob)
            });     

            if(!res.ok) {
                dispatch(setModalNotification({notify:'Failed to posted a new job.', status: false}))
                return null
            }

            const data: Promise<ResponseType> = await res.json()
            dispatch(setModalNotification({notify:'Successfully posted a new job', status: true}))
            return data

        } catch (error) {

            dispatch(setModalNotification({notify:'Failed to posted a new job.', status: false}))
            return  null
        }
    }
);

export const fetchJobs = createAsyncThunk<JobType[] |  null, string>(
    'auth/fetchJobs',
    async (createJob: string,{dispatch}) => {
        console.log('fetch');
        
        const token = localStorage.getItem('jwtToken'); 
        dispatch(setLoading('loading'))
        try {
            const res = await fetch('http://localhost:3001/jobs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`    
                },

            }); 
                                
            if(!res.ok) return null
            const data: Promise<ResponseJobs> = await res.json()
            return (await data).data

        } catch (error) {
            return  null
        }
    }
)


const  {reducer,actions} = jobsSlice;
export const {setLoading} = actions;
export default reducer