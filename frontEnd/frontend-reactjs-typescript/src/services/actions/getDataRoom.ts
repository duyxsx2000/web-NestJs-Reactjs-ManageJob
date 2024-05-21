import { AsyncThunkAction } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { getDataStartGroup } from '../fetchApi/fetchApiGroup copy';
import { AcctionType } from '../../types';
import { fetchTables, getDataTaskById, postAccepMember, postReqToJoinRoom } from '../fetchApi/fetchApis';
import { AcceptMember, AddMemberFR, IDs3 } from '../../types/typesSlice';
import { deleteMembeByRoom, deleteRoom, getDataRoomById, postAddJoinRoom } from '../fetchApi/fetchApiRooms';
const actionGetDataRoom = (idRoom: string) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= getDataRoomById(idRoom);
    return action
};

const actionGetDataTask = (ids: IDs3) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= getDataTaskById(ids);
    return action
};

const actionFetchTable = (ids: string[]) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= fetchTables(ids);
    return action
};

const actionReqToJoinRoom = (ids: {idRoom: string, idGroup: string, status: string}) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= postReqToJoinRoom(ids);
    return action
};

const actionDeleleRoom = (ids: {idRoom: string, idGroup: string}) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= deleteRoom(ids);
    return action
};
const actionAcceptMember = (acceptMember: AcceptMember) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= postAccepMember(acceptMember);
    return action
};

const actionAddMemberForRoom = (addMember: AddMemberFR) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= postAddJoinRoom(addMember);
    return action
};

const actionDeleteMemberByRoom = (addMember: AddMemberFR) => {
    const action: | AsyncThunkAction<ResponseType | null, string, AsyncThunkConfig> | AcctionType= deleteMembeByRoom(addMember);
    return action
};



export {
    actionGetDataRoom, 
    actionGetDataTask, 
    actionFetchTable, 
    actionDeleteMemberByRoom,
    actionReqToJoinRoom, 
    actionDeleleRoom, 
    actionAcceptMember, 
    actionAddMemberForRoom
}