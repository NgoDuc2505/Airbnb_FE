//react
import {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//interface store
import { AppDispatch, RootState } from '../../redux/store'
//const
import { IComment, ILocationItem, IRoomDetail, ICommentId } from '../../constant/constant'
import { getRoomById } from '../../redux/Detail-slice/DetailSlice';
import { appendCommentID, getCommentByRoomId, getCommentList } from '../../redux/Comment-slice/CommentSlice';

export const useRoomDetail = ()=>{
    const idRoom = useParams()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
      dispatch(getRoomById(idRoom.idDetail))
    },[idRoom])
    const stateData : IRoomDetail = useSelector((state: RootState)=>state.sliceRoomDetail.currentRoom)
    return stateData
}

export const useCommentRoom = () => { 
    const idRoom = useParams()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
      dispatch(getCommentByRoomId(idRoom.idDetail))
      dispatch(getCommentList())
    },[idRoom])
    const stateComment : IComment[] = useSelector((state: RootState)=>state.sliceComment.currentRoomComment)
    const listComment: ICommentId[] = useSelector((state: RootState)=>state.sliceComment.listComment)
    const listCommentSortById :ICommentId[] = listComment.filter((item: ICommentId)=>{return item.maPhong === Number(idRoom.idDetail)})
    dispatch(appendCommentID(listCommentSortById))
    return {stateComment, listCommentSortById}
}


export const useLocation = () =>{
    const stateLocation : ILocationItem[] = useSelector((state: RootState)=>state.sliceLocation.inspectOfSearchPage)
    return stateLocation
}

