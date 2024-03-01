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
    dataForm: CreateJob | null
};

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
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload   
        },

        deleteJob: (state, action: PayloadAction<number>) => {
            const newJobs = state.jobs.admin?.filter((job) => job.idJob != action.payload)
            if(!newJobs) return;
            state.jobs.admin = newJobs
        },

        setDataForm: (state, action: PayloadAction<JobType>) => {
            const job = {...action.payload}
            const formJob: CreateJob = {
                title: job.title,
                name: job.name,
                date:{
                  start: job.date.start,
                  expired:job.date.expired,
                },
            
                deadline: job.deadline,
                priority: job.priority,
                detail:job.detail,
                recommend:job.recommend,
            }
            state.dataForm = formJob

        },

    },

    extraReducers: (builder) => {

        builder
        .addCase(
            postDataCreateJob.fulfilled, 

            (state, action) => {
                if(!action.payload) {
                    return    
                }
                state.loading = false

            }
        )

        .addCase(
            fetchJobs.fulfilled, 
            (state, action) => {     
                console.log(action.payload);
                        
                if(!action.payload) {                    
                    return    
                };
                
                if(action.payload.key === 'home') {
                    state.jobs.home = action.payload.data;
                    state.loading = false;
                    return
                };
                
                if(action.payload.key === 'admin') {
                    state.jobs.admin = action.payload.data;
                    state.loading = false;
                    return
                } ;       
            }
        )

        .addCase(
            actionEditjob.fulfilled,
            (state,action) => {
                if(action.payload?.action === 'DELETE') {
                    const newJobs = state.jobs.admin?.filter((job) => job.idJob != action.payload?.job.idJob)
                    if(!newJobs) return;
                    state.jobs.admin = newJobs;
                    state.loading = false;
                    return
                };

                if(action.payload?.action === 'UPDATE') {
                    if(!state.jobs.admin) return;

                    const jobs = {...state.jobs.admin}
                    const newJobs = jobs.map((job) => {

                        if(job.idJob === action.payload?.job.idJob) {
                            return action.payload?.job
                        };
                        return job

                    })

                    state.jobs.admin = newJobs;
                    state.loading = false;
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
        dispatch(setLoading(true))
        try {

            const res = await fetch('http://localhost:3002/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`    
                },
                body: JSON.stringify(createJob)
            });     

            if(!res.ok) {
                dispatch(setModalNotification({notify:'Failed to posted a new job.', status: false}));
                return null
            };

            const data: Promise<ResponseType> = await res.json();
            dispatch(setModalNotification({notify:'Successfully posted a new job', status: true}));
            return data

        } catch (error) {
            dispatch(setModalNotification({notify:'Failed to posted a new job.', status: false}));
            return  null
        }
    }
);

export const fetchJobs = createAsyncThunk<{data: JobType[], key: string} |  null, string>(
    'jobs/fetchJobs',
    async (type: string,{dispatch}) => {
       
        const token = localStorage.getItem('jwtToken'); 
        
        
        dispatch(setLoading(true))
        try {
            const res = await fetch(`http://localhost:3002/jobs/${type}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`    
                },
 
            }); 
                                
            if(!res.ok) return null;
            
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

export const actionEditjob = createAsyncThunk<{job: JobType, action: string} | undefined , DataUpdateJob>(
   'jobs/actionEditjob',

    async (updateJob: DataUpdateJob,{dispatch}) => {

        if(updateJob.action === 'DELETE') {
            setLoading(true)
            try {
                const token = localStorage.getItem('jwtToken'); 
                const res = await fetch(`http://localhost:3002/jobs/${updateJob.job.idJob}`,{
                    method: 'DELETE',
                    headers: {
                        'Conten-Type': 'application/json',
                        Authorization: `Bearer ${token}`    
                    }
                });

                if(!res.ok) {
                    dispatch(setModalNotification({notify:'Error DELETE job', status: true}));
                    return
                };

                type ResponseData = {
                    data: JobType;
                    message: string;
                    statusCode: number;
                };

                const data: Promise<ResponseData> = await res.json();
                dispatch(setModalNotification({notify:'Successfully DELETE job', status: true}));

                return {
                    job:(await data).data,
                    action:'DELETE'
                }

            } catch (error) {
                dispatch(setModalNotification({notify:'Error DELETE job', status: true}))
               return 
            }
        };

        if(updateJob.action === 'UPDATE') {
            try {
                const newJob = {...updateJob.job,status:'Complete'}
                const token = localStorage.getItem('jwtToken'); 
                const res = await fetch(`http://localhost:3002/jobs/${updateJob.job.idJob}`,{
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