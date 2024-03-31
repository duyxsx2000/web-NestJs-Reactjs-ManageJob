import { setModalNotification } from "../../redux/slices/statusDisplaySloce";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { json } from "stream/consumers";
import { setLoading } from "../../redux/slices/jobsSlice";
import { apiGetGroup } from "../../api/apiTask";

export const getDataStartGroup= createAsyncThunk<any |  null, any>(
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
            return await res.json()

        } catch (error) {

          return  null
        }
    }
);

export const postDataRoom = createAsyncThunk<any,any>(
    'group/poshDataRoom',
    async () => {
        
    }
)
