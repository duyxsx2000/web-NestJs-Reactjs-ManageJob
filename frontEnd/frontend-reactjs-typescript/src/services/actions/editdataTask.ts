import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { getDataStartGroup } from '../fetchApi/fetchApiGroup copy';
import { AcctionType } from '../../types';
import { fetchEditTable, createNewRoom, createNewTable, patchUpdateRoom, patchUpdateTable } from '../fetchApi/fetchApiRoom';
import { CreateRoom, CreateTable, EditTable, UpdateRoom, UpdateTable } from '../../types/typesSlice';

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



export {
    actionEditTable,
    actionUpdateTable,
    actionUpdateRoom 
}