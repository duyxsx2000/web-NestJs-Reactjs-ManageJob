import { setModalNotification } from "../../redux/slices/statusDisplaySloce";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { json } from "stream/consumers";
import { setLoading } from "../../redux/slices/jobsSlice";
import { CreateRoom, CreateTable, CreateTask, EditTable, ResponseDataType, TitleRoom, TypeRoom, UpdateRoom } from "../../types/typesSlice";
import { apiCreateRoom, apiCreateTable, apiCreateTask, apiEditTable, apiGetDataRoomById, apiUpdateRoom } from "../../api/apiTask";
import { pushRooms } from "../../redux/slices/groupSlice";
const token = localStorage.getItem('jwtToken');

export const createNewRoom = createAsyncThunk<TitleRoom| undefined, CreateRoom>(
    'group/createNewRoom',
    async (createRoom: CreateRoom,{dispatch}) => {
        
        console.log(createRoom,'create');
        try {
            const res = await fetch(apiCreateRoom, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(createRoom)
            });

            if(!res.ok){
                console.log('error'); 
                dispatch(setModalNotification({notify: 'create new room error', status: false})) ;
            };

            dispatch(setModalNotification({notify: 'create new room success', status: true}));

            const response: ResponseDataType<TitleRoom>= await res.json();
            const newRoom = response.data
            return newRoom

        } catch (error) {

          return  
        }
    }
);

export const createNewTable = createAsyncThunk<TypeRoom | undefined, CreateTable>(
    'rooms/createNewTable',
    async (createTable: CreateTable,{dispatch}) => {
        
        console.log(createTable,'create');
        try {
            const res = await fetch(`${apiCreateTable}/${createTable.idRoom}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: createTable.title
                })
            });

            if(!res.ok){
                console.log('error'); 
                dispatch(setModalNotification({notify: 'create new table error', status: false})) ;
            };

            dispatch(setModalNotification({notify: 'create new table success', status: true}));

            const response: ResponseDataType<{title: string, data: TypeRoom}>= await res.json();  
            return response.data.data

        } catch (error) {

          return  
        }
    }
);

export const createNewTask = createAsyncThunk<TypeRoom | undefined, CreateTask>(
    'rooms/createNewTask',
    async (createTask: CreateTask,{dispatch}) => {
        
        console.log(createTask,'create');
        try {
            const res = await fetch(`${apiCreateTask}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(
                    createTask
                )
            });

            if(!res.ok){
                console.log('error'); 
                dispatch(setModalNotification({notify: 'create new task error', status: false})) ;
            };

            dispatch(setModalNotification({notify: 'create new task success', status: true}));

            const response: ResponseDataType<{title: string, data: TypeRoom}>= await res.json();  
            
            return response.data.data

        } catch (error) {

          return  
        }
    }
);


export const fetchEditTable = createAsyncThunk<TypeRoom | undefined, EditTable>(
    'rooms/fetchEditTable',
    async (editTable: EditTable,{dispatch}) => {
        
        console.log(editTable,'create');
        try {
            const res = await fetch(`${apiEditTable}/${editTable.idRoom}/${editTable.idTable}`, {
                method:`${editTable.action}`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },

            });

            if(!res.ok){
                dispatch(setModalNotification({notify: 'Delete table error', status: false})) ;
            };

            dispatch(setModalNotification({notify: 'Delete table success', status: true}));
            
            const response: ResponseDataType<{title: string, data: TypeRoom}>= await res.json();  

            return response.data.data 

        } catch (error) {

          return  
        }
    }
);

export const getDataRoomById = createAsyncThunk<TypeRoom | undefined,any>(
    'rooms/getDataRoomById',
    async (idRoom: string) => {
        console.log(token);
        console.log(`${apiGetDataRoomById}/${idRoom}`);
        
        
        const res = await fetch(`${apiGetDataRoomById}/${idRoom}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

        const response: ResponseDataType<{data: TypeRoom, title: string}> = await res.json()
        const room = response.data.data
        return room
    }
);

export const patchUpdateRoom = createAsyncThunk<TypeRoom | undefined, UpdateRoom>(
    'rooms/patchUpdateRoom',
    async (updateRoom: UpdateRoom, {dispatch}) => {
        console.log(updateRoom,'update');
        
        
        try {
            const res = await fetch(`${apiUpdateRoom}/${updateRoom.idRoom}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updateRoom)
            });
            console.log(await res.json(),'resresres');

            if(!res.ok) return undefined

            const response: ResponseDataType<{data: TypeRoom, title: string}> = await res.json();
            const room = response.data.data;
            return room

        } catch (error) {
            return undefined
        }
    }
)
