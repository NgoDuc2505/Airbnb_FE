
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IComment, ICommentId } from '../../constant/constant'
import { axiosInterceptorWithCybertoken } from '../../services/services'

export interface IRoomState{
    currentRoomComment: IComment[]
    listComment : ICommentId[]
    currentListCommentID: ICommentId[]
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

export const getCommentList = createAsyncThunk(
    'commentSlice/getCommentList',
    async ()=>{
        try{
            const resp = await axiosInterceptorWithCybertoken.get('/api/binh-luan')
            return resp
        }catch(error){
            console.log(error)
        }
    }
)

const initialState: IRoomState = {
    currentRoomComment: [],
    listComment : [],
    currentListCommentID : []

}

export const commentSlice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers:{
        appendCommentID: (state, action) => {
            state.currentListCommentID = action.payload;
        },
    },
    extraReducers: (build)=>{
        build.addCase(getCommentByRoomId.fulfilled,(state,action)=>{
            state.currentRoomComment = action.payload?.data.content
        })
        build.addCase(getCommentList.fulfilled, (state,action)=>{
            state.listComment = action.payload?.data.content
        })
    }
})

export const { appendCommentID } = commentSlice.actions;
export default commentSlice.reducer