import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { getDataStartGroup } from '../tasks/fetchApiGroup copy';
import { AcctionType } from '../../types';
import { getDataRoomById } from '../tasks/fetchApiRoom';
const actionGetDataRoom = (idRoom: string) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= getDataRoomById(idRoom);
    return action
}


export {actionGetDataRoom}