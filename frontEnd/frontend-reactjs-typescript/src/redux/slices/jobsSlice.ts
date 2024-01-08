import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CreateJob, JobType, ResponseType } from "../../types";
import { setModalNotification, setModalPostJob } from "./statusDisplaySloce";
import { json } from "stream/consumers";

type JobState = {
    jobs: {
        home: JobType[] | null,
        admin: JobType[] | null
    },
    loading: boolean,
    status: string,
    dataForm: JobType | null
}
const initialState: JobState = {
    jobs: {
        home: null,
        admin: null
    },
    loading: false,
    status:'none',
    dataForm: null

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

        deleteJob: (state, action: PayloadAction<number>) => {
            const newJobs = state.jobs.admin?.filter((job) => job.idJob != action.payload)
            if(!newJobs) return;
            state.jobs.admin = newJobs
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
                console.log(action.payload?.data, '-----', action.payload?.key);
                
                if(!action.payload) {                    
                    return    
                };

                if(action.payload.key === 'home') {
                    state.jobs.home = action.payload.data;
                    return
                };
                
                if(action.payload.key === 'admin') {
                    state.jobs.admin = action.payload.data;
                    return
                }        
            }
        )
    },
});



export const postDataCreateJob = createAsyncThunk<ResponseType |  null, CreateJob>(
    'jobs/postDataCreateJob',
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

export const fetchJobs = createAsyncThunk<{data: JobType[], key: string} |  null, string>(
    'jobs/fetchJobs',
    async (type: string,{dispatch}) => {
       
        const token = localStorage.getItem('jwtToken'); 
        dispatch(setLoading('loading'))
        try {
            const res = await fetch(`http://localhost:3001/jobs/${type}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`    
                },
 
            }); 
                                
            if(!res.ok) return null
            const data: Promise<ResponseJobs> = await res.json()          
            return {
                data: (await data).data,
                key: type
            }

        } catch (error) {
            return  null
        }
    }
);

type DataUpdateJob = {
    action: 'DELETE' | 'UPDATE' | 'COMPLETE',
    job: JobType
};

export const actionEditjob = createAsyncThunk<ResponseType | undefined , DataUpdateJob>(
   'jobs/actionEditjob',

    async (updateJob: DataUpdateJob,{dispatch}) => {

        console.log(updateJob);
        if(updateJob.action === 'DELETE') {
            try {
                const token = localStorage.getItem('jwtToken'); 
                const res = await fetch(`http://localhost:3001/jobs/${updateJob.job.idJob}`,{
                    method: 'DELETE',
                    headers: {
                        'Conten-Type': 'application/json',
                        Authorization: `Bearer ${token}`    
                    }
                })
                dispatch(deleteJob(updateJob.job.idJob))
                dispatch(setModalNotification({notify:'Successfully DELETE job', status: true}))
                return undefined
            } catch (error) {
                dispatch(setModalNotification({notify:'Error DELETE job', status: true}))
               return 
            }
        };

        if(updateJob.action === 'UPDATE') {
            try {
                const newJob = {...updateJob.job,status:'Complete'}
                const token = localStorage.getItem('jwtToken'); 
                const res = await fetch(`http://localhost:3001/jobs/${updateJob.job.idJob}`,{
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`    
                    },
                    body: JSON.stringify(newJob)
                });

                if(!res.ok) {
                    dispatch(setModalNotification({notify:'Error DELETE job', status: false}))
                    return undefined
                };
                console.log(res.json());
                
                dispatch(setModalNotification({notify:'Successfully DELETE job', status: true}))
                return undefined
            } catch (error) {
                dispatch(setModalNotification({notify:'Error DELETE job', status: false}))
               return 
            }
        };

    } 
)


const  {reducer,actions} = jobsSlice;
export const {setLoading, deleteJob} = actions;
export default reducer