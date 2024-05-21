import { setModalNotification } from "../../redux/slices/statusDisplaySloce";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { json } from "stream/consumers";
import { setLoading } from "../../redux/slices/jobsSlice";
import { AcceptMember, AddMemberFR, CreateAccount, CreateRoom, CreateTable, CreateTask, EditTable, Group, IDs3, ResponseDataType, Table, Task, TitleRoom, TypeMember, TypeRoom, TypeTable, UpdateRoom, UpdateTable, UpdateTask } from "../../types/typesSlice";
import { apiAcceptMember, apiAddMemberForRoom, apiCreateAccount, apiCreateRoom, apiCreateTable, apiCreateTask, apiDelateRoom, apiDeleteMemberByRoom, apiEditTable, apiGetDataRoomById, apiGetDataTaskById, apiUpdateRoom, apiUpdateTable, apiUpdateTask, apifetchTable, apijoinRoom } from "../../api/apiTask";
import { pushRooms } from "../../redux/slices/groupSlice";
import { setNotify } from "../../redux/slices/dashboardSlice";
import { setLisstUser, setRoom } from "../../redux/slices/roomSlice";
import { setReload } from "../../auth/authSlice"

export const createNewRoom = createAsyncThunk<Group| undefined, CreateRoom>(
    'group/createNewRoom',
    async (createRoom: CreateRoom,{dispatch}) => {
        const token = localStorage.getItem('jwtToken');
        try {
            const res = await fetch(apiCreateRoom,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(createRoom)
            });

            if(!res.ok){
                dispatch(setModalNotification({notify: 'create new room error', status: false})) ;
                return
            };

            dispatch(setModalNotification({notify: 'create new room success', status: true}));

            const response: ResponseDataType<{title: string, data: Group}>= await res.json();
            const newRoom = response.data.data
            return newRoom

        } catch (error) {

          return  
        }
    }
);

export const getDataRoomById = createAsyncThunk<TypeRoom | undefined,any>(
    'rooms/getDataRoomById',
    async (idRoom: string) => {
        const token = localStorage.getItem('jwtToken');

        
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

export const postAddJoinRoom = createAsyncThunk<TypeRoom | undefined,AddMemberFR>(
    'rooms/postAddJoinRoom',
    async (addMember: AddMemberFR,{dispatch}) => {
        const token = localStorage.getItem('jwtToken');    
        const res = await fetch(`${apiAddMemberForRoom}/${addMember.idRoom}/${addMember.idGroup}/${addMember.idMember}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            
        });  
        if(!res.ok)  {
            dispatch(setModalNotification({notify: 'Add member error', status: false})) ;
            return undefined
        }

        dispatch(setModalNotification({notify: 'Add member success', status: true})) ;   
        const response: ResponseDataType<{data: TypeRoom, title: string}> = await res.json()
        const room = response.data.data      
        return room
    }
);

type Ids2 = {
    idRoom: string,
    idGroup: string,
};

export const deleteRoom = createAsyncThunk<any | undefined,Ids2>(
    'rooms/delateRoom',
    async (ids: Ids2, {dispatch}) => {
        const token = localStorage.getItem('jwtToken');  
        const res = await fetch(`${apiDelateRoom}/${ids.idRoom}/${ids.idGroup}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

        if(!res.ok)  {
            dispatch(setModalNotification({notify: 'Delete room error', status: false})) ;
            return undefined
        }
        dispatch(setReload(true))
        dispatch(setModalNotification({notify: 'Delete success error', status: true})) ;

        // const response: ResponseDataType<{data: TypeRoom, title: string}> = await res.json()
        // const room = response.data.data      
        return undefined
    }
);

export const deleteMembeByRoom = createAsyncThunk<TypeRoom | undefined,AddMemberFR>(
    'rooms/deleteMembeByRoom',
    async (addMember: AddMemberFR, {dispatch}) => {
        const token = localStorage.getItem('jwtToken');    
        const res = await fetch(`${apiDeleteMemberByRoom}/${addMember.idRoom}/${addMember.idGroup}/${addMember.idMember}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            
        });      

        if(!res.ok)  {
            dispatch(setModalNotification({notify: 'Delete member error', status: false})) ;
            return undefined
        }
        
        dispatch(setModalNotification({notify: 'Delete member success', status: true})) ;
        const response: ResponseDataType<{data: TypeRoom, title: string}> = await res.json()
        const room = response.data.data      
        return room
    }
);

