import { setModalNotification } from "../../redux/slices/statusDisplaySloce";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { json } from "stream/consumers";
import { setLoading } from "../../redux/slices/jobsSlice";
import { AcceptMember, AddMemberFR, CreateAccount, CreateRoom, CreateTable, CreateTask, EditTable, Group, IDs3, ResponseDataType, Table, Task, TitleRoom, TypeMember, TypeRoom, TypeTable, UpdateRoom, UpdateTable, UpdateTask, UpdateTaskDto } from "../../types/typesSlice";
import { apiAcceptMember, apiAddMemberForRoom, apiCreateAccount, apiCreateRoom, apiCreateTable, apiCreateTask, apiDelateRoom, apiDeleteMemberByRoom, apiEditTable, apiGetDataRoomById, apiGetDataTaskById, apiUpdateMemberTask, apiUpdateRoom, apiUpdateTable, apiUpdateTask, apifetchTable, apijoinRoom } from "../../api/apiTask";
import { pushRooms } from "../../redux/slices/groupSlice";
import { setNotify } from "../../redux/slices/dashboardSlice";
import { joinTask, setLisstUser, setRoom } from "../../redux/slices/roomSlice";
import { setReload } from "../../auth/authSlice"
import { ChangeMember } from "../../types";

export const updateTask = createAsyncThunk<any| undefined, UpdateTaskDto>(
    'room/updataTask',
    async (updateTask: UpdateTaskDto,{dispatch}) => {
        const token = localStorage.getItem('jwtToken');
        try {
            const res = await fetch(`${apiUpdateTask}/${updateTask.idTask}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updateTask)
            });
            console.log( await res.json());
            if(!res.ok){
                dispatch(setModalNotification({notify: 'update task error', status: false})) ;
                return
            };

            dispatch(setModalNotification({notify: 'update task success', status: true}));

            
            
            return 

        } catch (error) {

          return  
        }
    }
);


export const updateMemberTask = createAsyncThunk<any| undefined, ChangeMember>(
    'room/updateTask',
    async (changeMember: ChangeMember,{dispatch}) => {
        const token = localStorage.getItem('jwtToken');
        try {
            const res = await fetch(apiUpdateMemberTask,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(changeMember)
            });

            if(!res.ok){
                dispatch(setModalNotification({notify: 'update task error', status: false})) ;
                return
            };
            
            if(changeMember.action === 'Add member') {
                dispatch(joinTask({
                    idMember: changeMember.idMember,
                    name: changeMember.name,
                    role: 'Member',
                    notify: true
                }))
            };

            dispatch(setModalNotification({notify: 'update task success', status: true})); 
            return 

        } catch (error) {

          return  
        }
    }
);