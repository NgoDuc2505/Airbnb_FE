import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { CYBER_TOKEN, IComment } from '../../constant/constant'
import { axiosInterceptorWithCybertoken } from '../../services/services'

export interface IRoomState{
    currentRoomComment: IComment[]
    
}

export const getCommentByRoomId = createAsyncThunk(
    'commentSlice/getCommentByRoomId',
    async (id: string | undefined)=>{
       try{
           const resp = await axiosInterceptorWithCybertoken.get(`/api/binh-luan/lay-binh-luan-theo-phong/${id}`)
           return resp
       }catch(error){
        console.log(error)
       }
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
            state.currentRoomComment = action.payload?.data.content
        })
    }
})

export default commentSlice.reducer