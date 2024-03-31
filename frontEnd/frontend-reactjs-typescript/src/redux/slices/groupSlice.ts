import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CreateJob, JobType, ResponseType, User } from "../../types";
import { setModalNotification, setModalPostJob } from "./statusDisplaySloce";
import {fetchJobs, postDataCreateJob } from "../../services/tasks/getDataRooms";
import { CreateRoom, TitleRoom } from "../../types/typesSlice";
import { getDataStartGroup } from "../../services/tasks/fetchApiGroup copy";
import { createNewRoom } from "../../services/tasks/fetchApiRoom";

interface Group {
    data: {
        group: {
            title: string,
            idGroup: string,
            members: string[],
            rooms: string []
        },
        rooms: TitleRoom[],
        members: User[]
    } | null,
    loading: boolean
}

const initialState: Group = {
    loading: false,
    data: null
};

export const groupSlice = createSlice({
    name:'group',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            
        },

        pushRooms: (state, action) => {
            state.data?.rooms.push(action.payload)
        },

        setDataForm: (state, action: PayloadAction<JobType>) => {


        },

    },

    extraReducers: (builder) => {

        builder
        .addCase(
            getDataStartGroup.fulfilled, 
            (state, action) => {
                if(!action.payload.data) return
                console.log(action.payload.data,'action');
                
                state.data = action.payload.data
            }
        )

        .addCase(
            createNewRoom.fulfilled, 
            (state, action) => {
                if(!action.payload)  return
                state.data?.rooms.push(action.payload)
            }
        )


    },
});






const  {reducer,actions} = groupSlice;
export const {setLoading, pushRooms} = actions;
export default reducer