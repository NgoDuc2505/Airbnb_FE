import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IProfile } from '../../constant/constant'
import { axiosInterceptorWithCybertoken } from '../../services/services'

export interface IUserState {
    currentUserbyPhanTrang: IProfile[] | any

}

export const getUserByPhanTrang = createAsyncThunk(
    'adminUserSlice/getUserByPhanTrang',
    async ({ pageIndex, keywords }: { pageIndex: number | undefined, keywords: string | undefined }) => {
        try {
            const resp = axiosInterceptorWithCybertoken.get(`/api/users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=8${keywords === "" ? "" : `&keyword=${keywords}`}`)
            return resp
        } catch (error) {
            console.log(error)
        }
    }
)

const initialState: IUserState = {
    currentUserbyPhanTrang: []
}

export const adminUserSlice = createSlice({
    name: 'adminUserSlice',
    initialState,
    reducers: {
        updateUserList: (state, action) => {
            const changeUserIndex = state.currentUserbyPhanTrang.data.findIndex((user: IProfile) => user.id === action.payload.id)
            state.currentUserbyPhanTrang.data[changeUserIndex] = action.payload;
        },

        deleteUserFromList: (state, action) => {
            const indexById = state.currentUserbyPhanTrang.data.findIndex((user: IProfile) => user.id === action.payload[0]);
            if (indexById != -1) {
                state.currentUserbyPhanTrang.data.splice(indexById, 1)
            }
        }
    },
    extraReducers: (build) => {
        build.addCase(getUserByPhanTrang.fulfilled, (state, action) => {
            state.currentUserbyPhanTrang = action.payload?.data.content
        })
    }
})




export const { updateUserList, deleteUserFromList } = adminUserSlice.actions;
export default adminUserSlice.reducer