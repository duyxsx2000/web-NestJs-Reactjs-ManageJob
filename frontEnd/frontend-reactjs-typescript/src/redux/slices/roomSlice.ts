import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {JobType} from "../../types";
import { ActionTask, DateTask, MemberTask, Table, Task, TypeMember, TypeRoom, TypeTable} from "../../types/typesSlice";
import {createNewTable, createNewTask, fetchEditTable, fetchTables,getDataTaskById, patchUpdateRoom, patchUpdateTable } from "../../services/fetchApi/fetchApis";
import { deleteMembeByRoom, getDataRoomById, postAddJoinRoom } from "../../services/fetchApi/fetchApiRooms";

interface RoomSlice {
    data: {
        room: TypeRoom | undefined,
        table: TypeTable[] | undefined
        task: Task | undefined,

    }
    dataTask: Task | undefined
    loading: boolean
    role: string,
    color: boolean
}

const initialState: RoomSlice = {
    loading: false,
    data: {
        room: undefined,
        table: [],
        task: undefined,

    },
    dataTask: undefined,
    role: '',
    color: false
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

        setDateTask: (state, action: PayloadAction<DateTask>) => {
            if(!state.dataTask?.dates) return
            state.dataTask.dates = action.payload
        },

        setDetailTask: (state, action: PayloadAction<string>) => {
            if(!state.dataTask) return
            state.dataTask.detail = action.payload
        },

        setColorG: (state, action: PayloadAction<boolean>) => {
            if(!state.data.table) return
            state.color = action.payload
        },

        delateTask: (state,action) => {
            state.dataTask = undefined
        },

        setLisstUser: (state, action: PayloadAction<TypeMember>) => {
            if(!action.payload || !state.data.room?.members) return
        
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

        setActionTask: (state, action: PayloadAction<ActionTask[]>) => {
            if(!state.dataTask?.actions) return
            state.dataTask.actions = action.payload
        },

        setMemberTask: (state, action: PayloadAction<MemberTask[]>) => {
            if(!state.dataTask?.actions) return
            console.log(action.payload,'act');
            
            state.dataTask.members = action.payload   
        },

        joinTask: (state, action: PayloadAction<MemberTask>) => {
            if(!state.dataTask?.actions) return       
            state.dataTask.members.push(action.payload)
            
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
                    console.log(action.payload.role);
                                
                    state.data.room = action.payload
                    state.role = action.payload.role
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

        .addCase(
            postAddJoinRoom.fulfilled,
            (state,action) => {

              if(!action.payload) return;
              if(!state.data.room?.members) return;
              state.data.room.members = action.payload.members;

            }
        )

        .addCase(
            deleteMembeByRoom.fulfilled,
            (state,action) => {

              if(!action.payload) return;
              if(!state.data.room?.members) return;   
              state.data.room.members = action.payload.members;

            }
        )
    },
});






const  {reducer,actions} = roomSlice;
export const {
    setTables, 
    setRoom,
    setDetailTask,
    delateTask, 
    changeTable, 
    setLisstUser, 
    setColorG, 
    setActionTask,
    setMemberTask,
    joinTask,
    setDateTask
} = actions;
export default reducer