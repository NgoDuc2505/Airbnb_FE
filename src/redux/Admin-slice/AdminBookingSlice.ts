// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import {IProfile } from '../../constant/constant'
// import { axiosInterceptorWithCybertoken } from '../../services/services'

// export interface IUserState{
//     currentUserbyPhanTrang: IProfile[] | any
    
// }

// export const getUserByPhanTrang = createAsyncThunk(
//     'adminSlice/getUserByPhanTrang',
//     async ({pageIndex, keywords}: {pageIndex: number | undefined, keywords: string | undefined})=>{
//         const resp = axiosInterceptorWithCybertoken.get(`/api/users/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=8${keywords === undefined ? "": `&keywords=${keywords}`}`)
//         return resp
//     }
// )

// const initialState: IUserState = {
//     currentUserbyPhanTrang: []
// }

// export const adminUserSlice = createSlice({
//     name: 'adminUserSlice',
//     initialState,
//     reducers:{
       
//     },
//     extraReducers: (build)=>{
//         build.addCase(getUserByPhanTrang.fulfilled,(state,action)=>{
//             state.currentUserbyPhanTrang = action.payload.data.content
//         })
//     }
// })

// export default adminUserSlice.reducer