import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CreateJob, JobType, ResponseType, User } from "../../types";
import { CreateRoom, Group, TitleRoom } from "../../types/typesSlice";
import { getDataStartGroup } from "../../services/fetchApi/fetchApiGroup copy";
import { createAccountForUser,postReqToJoinRoom } from "../../services/fetchApi/fetchApis";
import { createNewRoom } from "../../services/fetchApi/fetchApiRooms";

interface GroupSlice {
    data: Group| null
    loading: boolean
}

const initialState: GroupSlice = {
    loading: false,
    data: null
};

export const groupSlice = createSlice({
    name:'group',
    initialState,
    reducers: {
        setUser: (state, action) => {
            if(!state.data) return
            state.data.members = action.payload
        },

        pushRooms: (state, action) => {
            // state.data?.rooms.push(action.payload)
        },

        setDataForm: (state, action: PayloadAction<JobType>) => {


        },

    },

    extraReducers: (builder) => {

        builder
        .addCase(
            getDataStartGroup.fulfilled, 
            (state, action) => {
                if(!action.payload) return
                console.log(action.payload,'action');
                
                state.data = action.payload
            }
        )

        .addCase(
            createNewRoom.fulfilled, 
            (state, action) => {
                if(!action.payload)  return
                state.data = action.payload
            }
        )

        .addCase(
            createAccountForUser.fulfilled, 
            (state, action) => {
                if(!action.payload)  return
                console.log(action.payload,'ppopop');
                
                state.data = action.payload
            }
        )

        .addCase(
            postReqToJoinRoom.fulfilled, 
            (state, action) => {
                if(!action.payload)  return
                console.log(action.payload,'ppopop');
                
                state.data = action.payload
            }
        )


    },
});






const  {reducer,actions} = groupSlice;
export const { pushRooms, setUser} = actions;
export default reducer