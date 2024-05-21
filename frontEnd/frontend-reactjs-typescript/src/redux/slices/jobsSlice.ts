import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CreateJob, JobType, ResponseType } from "../../types";
import { setModalNotification, setModalPostJob } from "./statusDisplaySloce";
import { json } from "stream/consumers";
// import {fetchJobs, postDataCreateJob } from "../../services/fetchApi/getDataRooms";

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

});






const  {reducer,actions} = jobsSlice;
export const {setLoading, deleteJob} = actions;
export default reducer