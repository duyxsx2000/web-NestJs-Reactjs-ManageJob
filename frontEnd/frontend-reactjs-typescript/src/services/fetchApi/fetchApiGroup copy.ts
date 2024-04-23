import { setModalNotification } from "../../redux/slices/statusDisplaySloce";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { json } from "stream/consumers";
import { setLoading } from "../../redux/slices/jobsSlice";
import { apiGetGroup } from "../../api/apiTask";
import { Group, ResponseDataType } from "../../types/typesSlice";

export const getDataStartGroup= createAsyncThunk<Group | undefined, any>(
    'group/getDataStartGroup',
    async ({dispatch}) => {
        const token = localStorage.getItem('jwtToken');    
        try {
            const res = await fetch(apiGetGroup, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            if(!res.ok) return
            const response: ResponseDataType<{title: string, data: Group}> = await res.json()
            const group = response.data.data
            return group

        } catch (error) {

          return  undefined
        }
    }
);

export const postDataRoom = createAsyncThunk<any,any>(
    'group/poshDataRoom',
    async () => {
        
    }
)
