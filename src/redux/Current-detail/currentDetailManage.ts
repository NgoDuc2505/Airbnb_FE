import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IProfile, IRoomDetail } from '../../constant/constant'
import { axiosInterceptorWithCybertoken } from '../../services/services'

interface IInit {
    currentCustomer: IProfile | any,
    currentBookedRoom: IRoomDetail | any,
}

const initState: IInit ={
    currentCustomer :{},
    currentBookedRoom : {}
}

export const getCurrentCustomerById = createAsyncThunk(
    'currentSlice/getCurrentCustomerById',
    async (id: number)=>{
        try{
            const resp = await axiosInterceptorWithCybertoken.get(`/api/users/${id}`);
            return resp;
            
        }catch(error){
            console.log(error)
        }
    }
)
export const getCurrentBookedRoomById = createAsyncThunk(
    'currentSlice/getCurrentBookedRoomById',
    async (id: number)=>{
        try{
            const resp = await axiosInterceptorWithCybertoken(`/api/phong-thue/${id}`);
            return resp;
        }catch(error){
            console.log(error)
        }
    }
)

export const currentSlice = createSlice({
    name:'currentSlice',
    initialState: initState,
    reducers:{},
    extraReducers: (build)=>{
        build.addCase(getCurrentCustomerById.fulfilled,(state,action)=>{
            const underfinedUser ={
                id:-1,
                name:'Không xác định',
                email:'Không có tồn tại tài khoản',
                password:'',
                phone:'',
                birthday:'',
                avatar:'https://img.icons8.com/?size=2x&id=23264&format=png',
                gender:true,
                role:'USER'
            }
            if(action.payload){
                state.currentCustomer = action.payload?.data.content
            }else{
                state.currentCustomer = underfinedUser
            }
        }),
        build.addCase(getCurrentBookedRoomById.fulfilled,(state,action)=>{
            state.currentBookedRoom = action.payload?.data.content
        })
    }
})

export default currentSlice.reducer