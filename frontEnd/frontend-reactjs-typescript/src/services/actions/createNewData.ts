import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { getDataStartGroup } from '../tasks/fetchApiGroup copy';
import { AcctionType } from '../../types';
import { createNewRoom, createNewTable, createNewTask } from '../tasks/fetchApiRoom';
import { CreateRoom, CreateTable, CreateTask } from '../../types/typesSlice';

const actionCreateNewRoom = (createRoom: CreateRoom) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= createNewRoom(createRoom);
    return action
};

const actionCreateNewTable = (createTable: CreateTable) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= createNewTable(createTable);
    return action
}

const actionCreateNewTask = (createTask: CreateTask) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= createNewTask(createTask);
    return action
}
export {
    actionCreateNewRoom, 
    actionCreateNewTable,
    actionCreateNewTask
}