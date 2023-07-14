import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IRoomDetail } from '../../constant/constant'
import { axiosInterceptorWithCybertoken } from '../../services/services'

export interface IRoomState{
    currentRoombyPhanTrang: IRoomDetail[] | any
    
}

export const getRoomByPhanTrang = createAsyncThunk(
    'adminRoomSlice/getRoomByPhanTrang',
    async ({pageIndex, keywords}: {pageIndex: number | undefined, keywords: string | undefined})=>{
        try{
            const resp = axiosInterceptorWithCybertoken.get(`/api/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=8${keywords === undefined ? "": `&keyword=${keywords}`}`)
            return resp
        }catch(error){
            console.log(error)
        }
    }
)

const initialState: IRoomState = {
    currentRoombyPhanTrang: []
}

export const adminRoomSlice = createSlice({
    name: 'adminRoomSlice',
    initialState,
    reducers:{
       
    },
    extraReducers: (build)=>{
        build.addCase(getRoomByPhanTrang.fulfilled,(state,action)=>{
            state.currentRoombyPhanTrang = action.payload?.data.content
        })
    }
})

export default adminRoomSlice.reducer