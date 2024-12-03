import { setModalNotification } from "../../redux/slices/statusDisplaySloce";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { AcceptMember, AddMemberFR, CreateAccount, CreateRoom, CreateTable, CreateTask, EditTable, Group, IDs3, ResponseDataType, Table, Task, TitleRoom, TypeMember, TypeRoom, TypeTable, UpdateRoom, UpdateTable, UpdateTask } from "../../types/typesSlice";
import { apiAcceptMember, apiAddMemberForRoom, apiCreateAccount, apiCreateRoom, apiCreateTable, apiCreateTask, apiDelateRoom, apiEditTable, apiGetDataRoomById, apiGetDataTaskById, apiUpdateRoom, apiUpdateTable, apiUpdateTask, apifetchTable, apijoinRoom } from "../../api/apiTask";

import { setLisstUser, setRoom } from "../../redux/slices/roomSlice";
import { setLoading } from "../../auth/authSlice";
import Password from "antd/es/input/Password";



export const createAccountForUser = createAsyncThunk<Group | undefined, CreateAccount>(
    'rooms/createAccountForUser',
    async (createAccount: CreateAccount,{dispatch}) => {
        const token = localStorage.getItem('jwtToken');
        console.log(createAccount,'create');
        
        try {
            const res = await fetch(`${apiCreateAccount}/${createAccount.idGroup}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(
                    {
                        name: createAccount.name,
                        email: createAccount.email,
                        role:createAccount.role,
                        password:createAccount.password,
                    }
                )
            });

            if(!res.ok){
                dispatch(setModalNotification({notify: 'create new User error', status: false})) ;
                return
            };

            const response: ResponseDataType<Group>= await res.json();
            const group = response.data

            if(createAccount.type === 'test' ) {
                dispatch(setLoading('signIn'))
                console.log('tttttt');
                
            };

            if(group){
                
                dispatch(setModalNotification({notify: 'create new user success', status: true}));
                return group
            };

            dispatch(setModalNotification({notify: 'create new User error', status: false})) ;
            return undefined
            
        } catch (error) {

          return  
        }
    }
);

export const createNewTable = createAsyncThunk<TypeRoom | undefined, CreateTable>(
    'rooms/createNewTable',
    async (createTable: CreateTable,{dispatch}) => {
        const token = localStorage.getItem('jwtToken');
        try {
            const res = await fetch(`${apiCreateTable}/${createTable.idRoom}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: createTable.title,
                    idRoom: createTable.idRoom
                })
            });

            if(!res.ok){
                console.log('error'); 
                dispatch(setModalNotification({notify: 'create new table error', status: false})) ;
            };

            dispatch(setModalNotification({notify: 'create new table success', status: true}));

            const response: ResponseDataType<{title: string, data: TypeRoom}>= await res.json();
            const room = response.data.data
            
            return room
        } catch (error) {

          return  
        }
    }
);

export const createNewTask = createAsyncThunk<TypeRoom | undefined, CreateTask>(
    'rooms/createNewTask',
    async (createTask: CreateTask,{dispatch}) => {
        const token = localStorage.getItem('jwtToken');
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
            const roomAfterChange = response.data.data;

            if(roomAfterChange) {
                dispatch(setRoom(roomAfterChange))
            };
            
            return response.data.data

        } catch (error) {

          return  
        }
    }
);


export const fetchEditTable = createAsyncThunk<TypeRoom | undefined, EditTable>(
    'rooms/fetchEditTable',
    async (editTable: EditTable,{dispatch}) => {
        
        const token = localStorage.getItem('jwtToken');
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





type Ids3 = {
    idRoom: string,
    idGroup: string,
    status: string
};

export const postReqToJoinRoom = createAsyncThunk<Group | undefined,Ids3>(
    'rooms/postRequestToJoinRoom',
    async (ids: Ids3) => {
        const token = localStorage.getItem('jwtToken');    
        const res = await fetch(`${apijoinRoom}/${ids.idRoom}/${ids.idGroup}/${ids.status}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });      
        const response: ResponseDataType<{data: Group, title: string}> = await res.json()
        const room = response.data.data      
        return room
    }
);



export const fetchTables = createAsyncThunk<TypeTable[]| undefined,string[]>(
    'rooms/fetchTables',
    async (ids: string[]) => {
        const token = localStorage.getItem('jwtToken');
        
        const res = await fetch(apifetchTable, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(ids)
        });

        const response: ResponseDataType<{data: TypeTable[], title: string}> = await res.json()
        const tables = response.data.data
        return tables
    }
);

export const getDataTaskById = createAsyncThunk<Task | undefined,IDs3>(
    'rooms/getDataTaskById',
    async (ids: IDs3) => {
     
        const token = localStorage.getItem('jwtToken');
        const res = await fetch(`${apiGetDataTaskById}/${ids.idTask}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });

        const response: ResponseDataType<{data: Task, title: string}> = await res.json()
        const task = response.data.data
        
        return task
    }
);

export const patchUpdateRoom = createAsyncThunk<TypeRoom | undefined, UpdateRoom>(
    'rooms/patchUpdateRoom',
    async (updateRoom: UpdateRoom, {dispatch}) => {
        const token = localStorage.getItem('jwtToken');
        
        
        try {
            const res = await fetch(`${apiUpdateRoom}/${updateRoom.idRoom}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updateRoom)
            });
            if(!res.ok) return undefined

            const response: ResponseDataType<{data: TypeRoom, title: string}> = await res.json();
            const room = response.data.data;
            return room

        } catch (error) {
            return undefined
        }
    }
);

export const patchUpdateTable = createAsyncThunk<TypeRoom | undefined, UpdateTable>(
    'rooms/patchUpdateTable',
    async (updateTable: UpdateTable, {dispatch}) => {
        const token = localStorage.getItem('jwtToken');
        
        
        try {
            const res = await fetch(`${apiUpdateTable}/${updateTable.idRoom}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updateTable)
            });
            if(!res.ok) return undefined

            const response: ResponseDataType<{data: TypeRoom, title: string}> = await res.json();
            const room = response.data.data;
            return room

        } catch (error) {
            return undefined
        }
    }
);


export const postAccepMember = createAsyncThunk<TypeRoom | undefined, AcceptMember>(
    'rooms/postAccepMember',
    async (acceptMember: AcceptMember, {dispatch}) => {
        const token = localStorage.getItem('jwtToken');
        console.log(acceptMember,'update');
        
        
        try {
            const res = await fetch(`${apiAcceptMember}/${acceptMember.idRoom}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(
                    acceptMember.member
                )
            });
            console.log(await res.json(),'resresres');

            if(!res.ok) {
                dispatch(setModalNotification({notify: 'Accept member error', status: false})) ;
                return 
            }
            dispatch(setLisstUser(acceptMember.member))
            dispatch(setModalNotification({notify: 'Accept member cuccces', status: true})) ;
            // const response: ResponseDataType<{data: TypeRoom, title: string}> = await res.json();
            // const room = response.data.data;
            return  undefined

        } catch (error) {
            return undefined
        }
    }
)
