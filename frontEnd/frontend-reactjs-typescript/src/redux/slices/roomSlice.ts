import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CreateJob, JobType, ResponseType } from "../../types";
import { setModalNotification, setModalPostJob } from "./statusDisplaySloce";
import {  fetchJobs, postDataCreateJob } from "../../services/fetchApi/getDataRooms";
import { Table, Task, TypeMember, TypeRoom, TypeTable} from "../../types/typesSlice";
import { createNewRoom, createNewTable, createNewTask, fetchEditTable, fetchTables, getDataRoomById, getDataTaskById, patchUpdateRoom, patchUpdateTable } from "../../services/fetchApi/fetchApiRoom";
import { log } from "console";

interface RoomSlice {
    data: {
        room: TypeRoom | undefined,
        table: TypeTable[] | undefined
        task: Task | undefined
    }
    dataTask: Task | undefined

    
    loading: boolean
    role: string
}

const initialState: RoomSlice = {
    loading: false,
    data: {
        room: undefined,
        table: [],
        task: undefined
    },
    dataTask: undefined,
    role: 'admin'
};

export const roomSlice = createSlice({
    name:'rooms',
    initialState,
    reducers: {
        setTables: (state, action: PayloadAction<Table[]>) => {
            if(!state.data.table) return
            const cloneTables = [...state.data.table]
            const newListTable = action.payload.map((idTable) => cloneTables.find(table => table.idTable === idTable.idTable)).filter(item => item !== undefined) as TypeTable[];
            state.data.table = newListTable
     
        },

        delateTask: (state,action) => {
            state.dataTask = undefined
        },

        setLisstUser: (state, action: PayloadAction<TypeMember>) => {
            if(!action.payload || !state.data.room?.members) return
            console.log('setttttt');
            
            const cloneMebsers = [...state.data.room?.members]
            const newMembers = cloneMebsers.map(member => member.idMember != action.payload.idMember ? member : {
                ...action.payload,
                status: 'join'
            }) as TypeMember[]
            state.data.room.members = newMembers

        },

        changeTable: (state, action: PayloadAction<TypeTable[]>) => {
            if(!state.data.table) return
            const cloneTables = [...state.data.table];
            const newTable = cloneTables.map(
                (table) => action.payload.find(tableP => tableP.idTable === table.idTable) ? action.payload.find(tableP => tableP.idTable === table.idTable) : table
            ) as TypeTable[];
            state.data.table = newTable
        },
        setRoom: (state, action: PayloadAction<TypeRoom>) => {
            state.data.room = action.payload
        },

        setDataForm: (state, action: PayloadAction<JobType>) => {


        },

    },

    extraReducers: (builder) => {

        builder


        .addCase(
            fetchEditTable.fulfilled, 

            (state, action) => {
                if(!action.payload) return;
                if(!state.data) return;
                
                
                // state.data.tables = action.payload.tables;
                
            }
        )

        .addCase(
            getDataRoomById.fulfilled, 
            (state, action) => {     
                if(action.payload) {                  
                    state.data.room = action.payload
                }
               
                
            }
        )

        .addCase(
            patchUpdateTable.fulfilled, 
            (state, action) => {     
                if(action.payload) {                  
                    state.data.room = action.payload
                }
               
                
            }
        )

        .addCase(
            fetchTables.fulfilled, 
            (state, action) => {     
                if(action.payload) {
                    state.data.table= action.payload
                }
               
                
            }
        )

        .addCase(
            createNewTable.fulfilled,
            (state,action) => {

              if(!action.payload) return;
              if(!state.data) return;
              
              state.data.room = action.payload

            }
        )

        .addCase(
            createNewTask.fulfilled,
            (state,action) => {

              if(!action.payload) return;
              if(!state.data) return;
              
            //   state.data.tables = action.payload.tables;

            }
        )

        .addCase(
            patchUpdateRoom.fulfilled,
            (state,action) => {

              if(!action.payload) return;
              if(!state.data) return;
              console.log(action.payload,'pay lll');
              
              state.data.room = action.payload

            }
        )

        .addCase(
            getDataTaskById.fulfilled,
            (state,action) => {

              if(!action.payload) return;
              if(!state.data) return;
              state.dataTask = action.payload;

            }
        )
    },
});






const  {reducer,actions} = roomSlice;
export const {setTables, setRoom,delateTask, changeTable, setLisstUser} = actions;
export default reducer