import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { CYBER_TOKEN } from '../../constant/constant'
import { ILocationItem } from '../../constant/constant'
import { axiosInterceptorWithCybertoken } from '../../services/services'
export interface ILocationState{
    inspectOfSearchPage : ILocationItem[],
    listRoomByIdLocation : [],
}

export const getInspectOfSearchPage = createAsyncThunk(
    'locationSlice/getInspectOfSearchPage',
    async ()=>{
        // const resp = axios({
        //     url:'https://airbnbnew.cybersoft.edu.vn/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8',
        //     method:'get',
        //     headers:{
        //         tokenCybersoft: CYBER_TOKEN,
        //     }
        // })
        const resp = axiosInterceptorWithCybertoken.get('/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8')
        return resp;
    }
)

export const getListRoomByIdLocation =createAsyncThunk(
    'locationSlice/getListRoomByIdLocation',
    async (id: string | undefined)=>{
        // const resp = axios({
        //     url:`https://airbnbnew.cybersoft.edu.vn/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`,
        //     method:'get',
        //     headers:{
        //         tokenCybersoft: CYBER_TOKEN,
        //     }
        // })
        const resp = axiosInterceptorWithCybertoken.get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`)
        return resp
    }
)


const initialState: ILocationState = {
    inspectOfSearchPage: [],
    listRoomByIdLocation:[],
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
        build.addCase(getListRoomByIdLocation.fulfilled,(state,action)=>{
            state.listRoomByIdLocation = action.payload.data.content
        })
    }
})

// export const { } = locationSlice.actions

export default locationSlice.reducer