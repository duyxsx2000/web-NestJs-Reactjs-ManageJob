import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CreateJob, JobType, ResponseType } from "../../types";
import { setModalNotification, setModalPostJob } from "./statusDisplaySloce";
import {  fetchJobs, postDataCreateJob } from "../../services/tasks/getDataRooms";
import { Table, TypeRoom} from "../../types/typesSlice";
import { createNewRoom, createNewTable, createNewTask, fetchEditTable, getDataRoomById, patchUpdateRoom } from "../../services/tasks/fetchApiRoom";
import { log } from "console";

interface RoomSlice {
    data: TypeRoom | undefined,
    loading: boolean
}

const initialState: RoomSlice = {
    loading: false,
    data: undefined
};

export const roomSlice = createSlice({
    name:'rooms',
    initialState,
    reducers: {
        setTables: (state, action: PayloadAction<Table[]>) => {
            if(!state.data) return
            state.data.tables = action.payload
        },

        deleteJob: (state, action: PayloadAction<number>) => {

        },

        setDataForm: (state, action: PayloadAction<JobType>) => {


        },

    },

    extraReducers: (builder) => {

        builder
        .addCase(
            createNewRoom.fulfilled, 

            (state, action) => {
                console.log(action.payload,'payload');
                
            }
        )

        .addCase(
            fetchEditTable.fulfilled, 

            (state, action) => {
                if(!action.payload) return;
                if(!state.data) return;
                
                state.data.tables = action.payload.tables;
                
            }
        )

        .addCase(
            getDataRoomById.fulfilled, 
            (state, action) => {     
                if(action.payload) {
                    state.data = action.payload
                }
                console.log(action.payload,'payload');
                
            }
        )

        .addCase(
            createNewTable.fulfilled,
            (state,action) => {

              if(!action.payload) return;
              if(!state.data) return;
              
              state.data.tables = action.payload.tables;

            }
        )

        .addCase(
            createNewTask.fulfilled,
            (state,action) => {

              if(!action.payload) return;
              if(!state.data) return;
              
              state.data.tables = action.payload.tables;

            }
        )

        .addCase(
            patchUpdateRoom.fulfilled,
            (state,action) => {

              if(!action.payload) return;
              if(!state.data) return;
              
              state.data.tables = action.payload.tables;

            }
        )
    },
});






const  {reducer,actions} = roomSlice;
export const {setTables, deleteJob} = actions;
export default reducer