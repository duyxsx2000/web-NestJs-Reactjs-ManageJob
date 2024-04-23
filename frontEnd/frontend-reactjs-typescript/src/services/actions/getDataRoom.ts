import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { getDataStartGroup } from '../fetchApi/fetchApiGroup copy';
import { AcctionType } from '../../types';
import { deleteRoom, fetchTables, getDataRoomById, getDataTaskById, postAccepMember, postReqToJoinRoom } from '../fetchApi/fetchApiRoom';
import { AcceptMember, IDs3 } from '../../types/typesSlice';
const actionGetDataRoom = (idRoom: string) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= getDataRoomById(idRoom);
    return action
}

const actionGetDataTask = (ids: IDs3) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= getDataTaskById(ids);
    return action
}

const actionFetchTable = (ids: string[]) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= fetchTables(ids);
    return action
}

const actionReqToJoinRoom = (ids: {idRoom: string, idGroup: string}) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= postReqToJoinRoom(ids);
    return action
}

const actionDeleleRoom = (ids: {idRoom: string, idGroup: string}) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= deleteRoom(ids);
    return action
}
const actionAcceptMember = (acceptMember: AcceptMember) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= postAccepMember(acceptMember);
    return action
}



export {actionGetDataRoom, actionGetDataTask, actionFetchTable, actionReqToJoinRoom, actionDeleleRoom, actionAcceptMember}