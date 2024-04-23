import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CountJobs, CreateJob, JobType, ResponseType } from "../../types";
import { setModalNotification, setModalPostJob } from "./statusDisplaySloce";
import { json } from "stream/consumers";

// type CountJob = {
//     status: string,
//     count: number
// };

// type CountJobs = {
//     countJobOfDay?: CountJob[]  | null
//     countJobOfMonth?: CountJob[]| null,
//     countJobOfYear?: CountJob[]| null,
// };

interface JobState {
    countJobs: CountJobs;
    loading: boolean;
    status: string;
    dataForm: CreateJob | null;
    notify:string
};

const initialState: JobState = {
    countJobs:{
        countJobOfMonth: null,
        countJobOfDay: null,
        countJobOfYear: null
    },
    loading: false,
    status:'none',
    dataForm: null,
    notify:''

};

export const dashboardSlice = createSlice({
    name:'dashboard',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload   
        },

        setNotify: (state, action : PayloadAction<string>) => {         
            state.notify = action.payload
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
            fetchDataCountJobs.fulfilled, 

            (state, action) => {
                const countJobs = action.payload;
                console.log(countJobs,'action');
                
                if(countJobs?.countJobOfDay){
                    state.countJobs.countJobOfDay = countJobs?.countJobOfDay
                };

                if(countJobs?.countJobOfMonth){
                    state.countJobs.countJobOfMonth = countJobs?.countJobOfMonth
                };

                if(countJobs?.countJobOfYear){
                    state.countJobs.countJobOfYear = countJobs?.countJobOfYear
                };
            }
        )
    },
});

type DataInput = {
    time: Date,
    type: 'MONTH' | 'DAY' | 'YEAR' | 'ALL'
}

export const fetchDataCountJobs = createAsyncThunk<CountJobs |  null, DataInput>(
    'jobs/fetchDataCountJobs',
    async (dataInput: DataInput,{dispatch}) => {

        const token = localStorage.getItem('jwtToken'); 
        dispatch(setLoading(true))
        try {

            const res = await fetch(`http://localhost:3002/jobs/statistics/${dataInput.time}/${dataInput.type}`,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                }
              })

            if(!res.ok) {
                dispatch(setModalNotification({notify:'Failed fetch data.', status: false}));
                return null
            };

            const data = await res.json();
            const countJobs: CountJobs = data.data
            
            dispatch(setLoading(false))
            return countJobs

        } catch (error) {
            dispatch(setModalNotification({notify:'Failed fetch data.', status: false}));
            return  null
        }
    }
);



const  {reducer,actions} = dashboardSlice;
export const {setLoading, setNotify} = actions;
export default reducer