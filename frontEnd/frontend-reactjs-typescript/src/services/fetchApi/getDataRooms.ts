import { setModalNotification } from "../../redux/slices/statusDisplaySloce";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CreateJob, JobType, ResponseType } from "../../types";
import { json } from "stream/consumers";
import { setLoading } from "../../redux/slices/jobsSlice";

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
const token = localStorage.getItem('jwtToken');

export const postDataCreateJob = createAsyncThunk<ResponseType |  null, CreateJob>(
    'jobs/postDataCreateJob',
    async (createJob: CreateJob,{dispatch}) => {

         
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

export const updateRoom = createAsyncThunk<any, any>(
   'jobs/updateRoom',

    async (updateRoom: DataUpdateJob,{dispatch}) => {

    }



)