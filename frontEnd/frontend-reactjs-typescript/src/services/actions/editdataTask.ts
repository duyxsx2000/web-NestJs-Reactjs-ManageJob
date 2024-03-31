import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { getDataStartGroup } from '../tasks/fetchApiGroup copy';
import { AcctionType } from '../../types';
import { fetchEditTable, createNewRoom, createNewTable, patchUpdateRoom } from '../tasks/fetchApiRoom';
import { CreateRoom, CreateTable, EditTable, UpdateRoom } from '../../types/typesSlice';

const actionEditTable = (editTable: EditTable) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= fetchEditTable(editTable);
    return action
};

const actionUpdateRoom = (updateRoom: UpdateRoom) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= patchUpdateRoom(updateRoom);
    return action
};



export {
    actionEditTable,
    actionUpdateRoom 
}