import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {ILocationItem } from '../../constant/constant'
import { axiosInterceptorWithCybertoken} from '../../services/services'


export interface ILocationState{
    currentLocationbyPhanTrang: ILocationItem[] | any,
}

export const getLocationByPhanTrang = createAsyncThunk(
    'adminLocationSlice/getLocationByPhanTrang',
    async ({pageIndex, keywords}: {pageIndex: number | undefined, keywords: string | undefined})=>{
        try{
            const resp = await axiosInterceptorWithCybertoken.get(`/api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=8${keywords === undefined ? "": `&keyword=${keywords}`}`)
            return resp
        }catch(error){
            console.log(error)
        }
    }
)

const initialState: ILocationState = {
    currentLocationbyPhanTrang: [],
}

export const adminLocationSlice = createSlice({
    name: 'adminLocationSlice',
    initialState,
    reducers:{
       
    },
    extraReducers: (build)=>{
        build.addCase(getLocationByPhanTrang.fulfilled,(state,action)=>{
            state.currentLocationbyPhanTrang = action.payload?.data.content
        })   
    }
})

export default adminLocationSlice.reducer