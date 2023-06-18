//react
import {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//interface store
import { AppDispatch, RootState } from '../../redux/store'
import { getListRoomByIdLocation } from '../../redux/Location-slice/LocationSlice'
//const
import { IRoomDetail } from '../../constant/constant'

const useRoomList = ()=>{
    const {idLocation} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
      dispatch(getListRoomByIdLocation(idLocation))
    },[idLocation])
    const stateData: IRoomDetail[] = useSelector((state: RootState)=>state.sliceLocation.listRoomByIdLocation)
    return stateData
}

export default useRoomList;