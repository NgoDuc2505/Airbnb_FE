import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { CYBER_TOKEN } from '../../constant/constant'

export interface ILocationItem{
    hinhAnh: string,
    id: number,
    quocGia: string,
    tenViTri: string,
    tinhThanh: string
}

export interface ILocationState{
    inspectOfSearchPage : ILocationItem[],
}

export const getInspectOfSearchPage = createAsyncThunk(
    'locationSlice/getInspectOfSearchPage',
    async ()=>{
        const resp = axios({
            url:'https://airbnbnew.cybersoft.edu.vn/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8',
            method:'get',
            headers:{
                tokenCybersoft: CYBER_TOKEN,
            }
        })
        return resp;
    }
)

const initialState: ILocationState = {
    inspectOfSearchPage: [],
  }

export const locationSlice = createSlice({
    name: 'locationSlice',
    initialState,
    reducers:{
       
    },
    extraReducers: (build)=>{
        build.addCase(getInspectOfSearchPage.fulfilled,(state,action)=>{
            state.inspectOfSearchPage = action.payload.data.content.data;
        })
    }
})

// export const { } = locationSlice.actions

export default locationSlice.reducer