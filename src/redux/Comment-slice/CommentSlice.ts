import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { CYBER_TOKEN, IComment } from '../../constant/constant'

export interface IRoomState{
    currentRoomComment: IComment[]
    
}

export const getCommentByRoomId = createAsyncThunk(
    'commentSlice/getCommentByRoomId',
    async (id: string | undefined)=>{
        const resp = axios({
            url:`https://airbnbnew.cybersoft.edu.vn/api/binh-luan/lay-binh-luan-theo-phong/${id}`,
            method:'get',
            headers:{
                tokenCybersoft: CYBER_TOKEN,
            }
        })
        return resp
    }
)

const initialState: IRoomState = {
    currentRoomComment: []
}

export const commentSlice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers:{
       
    },
    extraReducers: (build)=>{
        build.addCase(getCommentByRoomId.fulfilled,(state,action)=>{
            state.currentRoomComment = action.payload.data.content
        })
    }
})

// export const { } = locationSlice.actions

export default commentSlice.reducer