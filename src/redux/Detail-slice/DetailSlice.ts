import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { CYBER_TOKEN, IRoomDetail } from '../../constant/constant'

export interface IRoomState{
    currentRoom: IRoomDetail | any
    
}

export const getRoomById = createAsyncThunk(
    'roomSlice/getRoomById',
    async (id: string | undefined)=>{
        const resp = axios({
            url:`https://airbnbnew.cybersoft.edu.vn/api/phong-thue/${id}`,
            method:'get',
            headers:{
                tokenCybersoft: CYBER_TOKEN,
            }
        })
        return resp
    }
)

const initialState: IRoomState = {
    currentRoom: {}
}

export const roomSlice = createSlice({
    name: 'roomSlice',
    initialState,
    reducers:{
       
    },
    extraReducers: (build)=>{
        build.addCase(getRoomById.fulfilled,(state,action)=>{
            state.currentRoom = action.payload.data.content
            console.log(state.currentRoom);
        })
    }
})

// export const { } = locationSlice.actions

export default roomSlice.reducer