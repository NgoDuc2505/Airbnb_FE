import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { CYBER_TOKEN, IBookRoom, IRoomDetail } from '../../constant/constant'
import { axiosInterceptorWithCybertoken } from '../../services/services'

export interface IRoomState{
    currentRoom: IRoomDetail,
    currentBookRoom: IBookRoom[]
}

export const getRoomByUserId = createAsyncThunk(
    'roomSlice/getRoomByUserId',
    async (id: number | undefined)=>{
        const resp = await axiosInterceptorWithCybertoken.get(`/api/dat-phong/lay-theo-nguoi-dung/${id}`)
        return resp
    }
)



export const getRoomById = createAsyncThunk(
    'roomSlice/getRoomById',
    async (id: string | undefined)=>{
        const resp = await axios({
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
    currentRoom: {
        id: 0,
        tenPhong:'',
        tivi: false,
        phongNgu: 0,
        phongTam: 0,
        khach: 0,
        giuong: 0,
        giaTien: 0,
        maViTri: -1,
        mayGiat: false,
        wifi: false,
        banLa: false,
        banUi: false,
        bep: false,
        dieuHoa: false,
        doXe: false,
        moTa:'',
        hinhAnh: '',
        hoBoi: false,
    },
    currentBookRoom:[]
}

export const roomSlice = createSlice({
    name: 'roomSlice',
    initialState,
    reducers:{
       
    },
    extraReducers: (build)=>{
        build.addCase(getRoomById.fulfilled,(state,action)=>{
            state.currentRoom = action.payload.data.content
        })
        build.addCase(getRoomByUserId.fulfilled,(state,action)=>{
            state.currentBookRoom = action.payload.data.content
        })
    }
})

// export const { } = locationSlice.actions

export default roomSlice.reducer