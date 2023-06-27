import React from 'react'
import Detail from '../../Components/Detail/detail'
import { Container } from '@mui/material'
import { getCommentRoom, getLocation, getRoomDetail } from './DetailRoomLogic'
import {ILocationItem } from '../../constant/constant'

function DetailRoom() {
  const stateData = getRoomDetail()
  const stateLocation = getLocation()
  const stateComment = getCommentRoom()
  const currentLocation = stateLocation.find((item: ILocationItem)=> item.id === stateData.maViTri);
  return (
    <div>
      <Container maxWidth='xl'>
        <Detail dataDetail={stateData} location = {currentLocation} comment = {stateComment}/> 
      </Container>
    </div>
  )
}

export default DetailRoom