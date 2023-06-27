//react
import {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//interface store
import { AppDispatch, RootState } from '../../redux/store'
//const
import { IComment, ILocationItem, IRoomDetail } from '../../constant/constant'
import { getRoomById } from '../../redux/Detail-slice/DetailSlice';
import { getCommentByRoomId } from '../../redux/Comment-slice/CommentSlice';

export const getRoomDetail = ()=>{
    const idRoom = useParams()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
      dispatch(getRoomById(idRoom.idDetail))
    },[idRoom])
    const stateData : IRoomDetail | any = useSelector((state: RootState)=>state.sliceDetail.currentRoom)
    return stateData
}

export const getCommentRoom = () => { 
    const idRoom = useParams()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
      dispatch(getCommentByRoomId(idRoom.idDetail))
    },[idRoom])
    const stateComment : IComment[] = useSelector((state: RootState)=>state.sliceComment.currentRoomComment)
    return stateComment
}


export const getLocation = () =>{
    const stateLocation : ILocationItem[] = useSelector((state: RootState)=>state.sliceLocation.inspectOfSearchPage)
    return stateLocation
}

