import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IBookRoom, IRoomDetail } from '../../constant/constant'
import { axiosInterceptorWithCybertoken } from '../../services/services'

export interface IRoomState {
    currentRoom: IRoomDetail,
    currentBookRoom: IBookRoom[]
}

export const getRoomByUserId = createAsyncThunk(
    'roomSlice/getRoomByUserId',
    async (id: number | undefined) => {
        try {
            const resp = await axiosInterceptorWithCybertoken.get(`/api/dat-phong/lay-theo-nguoi-dung/${id}`)
            return resp
        } catch (error) {
            console.log(error)
        }
    }
)



export const getRoomById = createAsyncThunk(
    'roomSlice/getRoomById',
    async (id: string | undefined) => {
        try {
            const resp = await axiosInterceptorWithCybertoken.get(`/api/phong-thue/${id}`)
            return resp
        } catch (error) {
            console.log(error)
        }
    }
)

const initialState: IRoomState = {
    currentRoom: {
        id: 0,
        tenPhong: '',
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
        moTa: '',
        hinhAnh: '',
        hoBoi: false,
    },
    currentBookRoom: []
}

export const roomSlice = createSlice({
    name: 'roomSlice',
    initialState,
    reducers: {

    },
    extraReducers: (build) => {
        build.addCase(getRoomById.fulfilled, (state, action) => {
            state.currentRoom = action.payload?.data.content
        })
        build.addCase(getRoomByUserId.fulfilled, (state, action) => {
            state.currentBookRoom = action.payload?.data.content
        })
    }
})

export default roomSlice.reducer