import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateJob, ResponseType } from "../../types";

type JobState = {
    modalCreateUser: boolean
    modalNotification: {
        title: string,
        status: boolean
    }
    modalPostJob: boolean
}
const initialState: JobState = {
    modalCreateUser: false,
    modalNotification: {
        title:'',
        status: false
    },
    modalPostJob:false

};

export const statusDisplaySlice = createSlice({
    name:'statusDisplay',
    initialState,
    reducers: {
        setModalCreateUser: (state, action) => {           
            if(!state.modalCreateUser) {
                state.modalCreateUser = true
            } else {
                state.modalCreateUser = false
            }
        },
        setModalPostJob: (state, action) => {           
            if(!state.modalPostJob) {
                state.modalPostJob = true
            } else {
                state.modalPostJob = false
            }
        },
        setModalNotification: (state, action) => {   
            console.log(action.payload);
                    
            state.modalNotification.title = action.payload.notify
            state.modalNotification.status = action.payload.status
        }
    },
 
});





const  {reducer,actions} = statusDisplaySlice;
export const {setModalCreateUser, setModalNotification, setModalPostJob} = actions;
export default reducer