import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
import { axiosInterceptorWithCybertoken } from '../../services/services'
import { IProfile } from '../../constant/constant'
interface IState {
    profileData: IProfile
}

const initialState: IState = {
    profileData: {
        id: 0,
        name: '',
        phone:'',
        birthday: '',
        avatar: '',
        gender: true,
        role:'',
        email:'',
        password:''
    }
}

export const getProfileData = createAsyncThunk(
    'userSlice/getProfileData',
    async (id: number)=>{
        const resp = await axiosInterceptorWithCybertoken.get(`/api/users/${id}`)
        return resp;
    }
)


export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers:{},
    extraReducers: (build)=>{
        build.addCase(getProfileData.fulfilled,(state,action)=>{
            state.profileData = action.payload.data.content
        })
    }
})

export default userSlice.reducer