import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { getDataStartGroup } from '../fetchApi/fetchApiGroup copy';
import { AcctionType, ChangeMember } from '../../types';
import { fetchEditTable, createNewTable, patchUpdateRoom, patchUpdateTable } from '../fetchApi/fetchApis';
import { CreateRoom, CreateTable, EditTable, UpdateRoom, UpdateTable, UpdateTaskDto } from '../../types/typesSlice';
import { updateMemberTask, updateTask } from '../fetchApi/fetchApiTask';

const actionEditTable = (editTable: EditTable) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= fetchEditTable(editTable);
    return action
};

const actionUpdateRoom = (updateRoom: UpdateRoom) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= patchUpdateRoom(updateRoom);
    return action
};

const actionUpdateTable = (updateTable: UpdateTable) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= patchUpdateTable(updateTable);
    return action
};

const actionUpdateTask = (updataTaskDto: UpdateTaskDto) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= updateTask(updataTaskDto);
    return action
};

const actionUpdateMembrTask = (changeMember: ChangeMember) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= updateMemberTask(changeMember);
    return action
};



export {
    actionEditTable,
    actionUpdateTable,
    actionUpdateRoom ,
    actionUpdateTask,
    actionUpdateMembrTask
}