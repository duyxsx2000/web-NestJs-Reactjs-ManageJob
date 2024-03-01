import { createSlice } from "@reduxjs/toolkit";
import { DataTask } from "../../types";

interface Default {
    room: {
        id: number,
        name: string
    },
    tableList: DataTask[],
    isDragging: boolean,
}

const initialState: Default = {
    room : {
        id:1,
        name: 'Room test 01'
    },
    isDragging: false,
    tableList: [
        {   
            id: 1,
            name: 'table 1',
            taskList: [
                {
                    id: 11,
                    name: 'task 1'
                },
                {
                    id: 12,
                    name: 'task 2'
                },
                {
                    id: 13,
                    name: 'task 3'
                },
                {
                    id: 14,
                    name: 'task 4'
                }
            ]
        },
        {   
            id: 2,
            name: 'table 2',
            taskList: [
                {
                    id: 21,
                    name: 'task 21'
                },
                {
                    id: 22,
                    name: 'task 22'
                },
                {
                    id: 23,
                    name: 'task 23'
                },
                {
                    id: 24,
                    name: 'task 24'
                }
            ]
        },
        {   
            id: 3,
            name: 'table 3',
            taskList: [
                {
                    id: 31,
                    name: 'task 31'
                },
                {
                    id: 32,
                    name: 'task 32'
                },
                {
                    id: 33,
                    name: 'task 33'
                },
                {
                    id: 34,
                    name: 'task 34'
                }
            ]
        },
        {   
            id: 4,
            name: 'table 4',
            taskList: [
                {
                    id: 41,
                    name: 'task 41'
                },
                {
                    id: 42,
                    name: 'task 42'
                },
                {
                    id: 43,
                    name: 'task 43'
                },
                {
                    id: 44,
                    name: 'task 44'
                }
            ]
        },
        {   
            id: 5,
            name: 'table 5',
            taskList: [
                {
                    id: 51,
                    name: 'task 51'
                },
                {
                    id: 52,
                    name: 'task 52'
                },
                {
                    id: 53,
                    name: 'task 53'
                },
                {
                    id: 54,
                    name: 'task 54'
                }
            ]
        }
    ]

}
export const dataTaskSlice = createSlice({
    name: 'dataTask',
    initialState,
    reducers: {
        setIsDagging: (state, action) => {
            state.isDragging = action.payload
        },
        setChange: (state, action) => {
            console.log(action.payload);
            
        }
    }
});

const {reducer, actions} = dataTaskSlice;
export const {setIsDagging, setChange} = actions;
export default reducer;