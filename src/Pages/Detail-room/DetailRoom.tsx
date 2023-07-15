
import Detail from '../../Components/Detail/detail'
import { Container } from '@mui/material'
import { useCommentRoom, useLocation, useRoomDetail } from './DetailRoomLogic'
import {ILocationItem } from '../../constant/constant'

function DetailRoom() {
  const stateData = useRoomDetail()
  const stateLocation = useLocation()
  const stateComment = useCommentRoom()
  const currentLocation = stateLocation.find((item: ILocationItem)=> item.id === stateData.maViTri);
  return (
    <div>
      <Container maxWidth='lg'>
        <Detail dataDetail={stateData} location = {currentLocation} comment = {stateComment.stateComment} commentIdList = {stateComment.listCommentSortById}/> 
      </Container>
    </div>
  )
}

export default DetailRoom