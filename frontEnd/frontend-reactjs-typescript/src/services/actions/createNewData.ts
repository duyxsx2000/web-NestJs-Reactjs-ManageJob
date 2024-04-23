import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { getDataStartGroup } from '../fetchApi/fetchApiGroup copy';
import { AcctionType } from '../../types';
import { createAccountForUser, createNewRoom, createNewTable, createNewTask } from '../fetchApi/fetchApiRoom';
import { CreateAccount, CreateRoom, CreateTable, CreateTask } from '../../types/typesSlice';

const actionCreateNewRoom = (createRoom: CreateRoom) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= createNewRoom(createRoom);
    return action
};

const actionCreateNewTable = (createTable: CreateTable) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= createNewTable(createTable);
    return action
};

const actionCreateNewTask = (createTask: CreateTask) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= createNewTask(createTask);
    return action
};

const actionCreateNewAccountForUser = (createAcount: CreateAccount) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= createAccountForUser(createAcount);
    return action
};
export {
    actionCreateNewRoom, 
    actionCreateNewTable,
    actionCreateNewTask,
    actionCreateNewAccountForUser
}