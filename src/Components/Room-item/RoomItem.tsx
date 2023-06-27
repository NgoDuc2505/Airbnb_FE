// import React from 'react'
import './roomItem.scss'
//constant
import { IRoomDetail } from '../../constant/constant'
import { NavLink } from 'react-router-dom'
interface IProps{
    listRoomItem: IRoomDetail,
}

function RoomItem({ listRoomItem }:IProps) {
  return (
    <div className='room-item'>
        <div className="icon-favorite">
        <i className="fa-regular fa-heart"></i>
        </div>
        <div className="room-item-img">
        <img src={listRoomItem.hinhAnh} alt="..." />
        </div>
        <div className="room-item-content">
            <div className="room-item-title">
                <p>Toàn bộ căn hộ, khách sạn tại địa điểm</p>
                <NavLink to={`/Detail/` + listRoomItem.id}><h2>{listRoomItem.tenPhong}</h2></NavLink>
                
            </div>
            <hr className='hr-item' />
            <div className="room-item-detail">
                <p>{listRoomItem.moTa}</p>
            </div>
            <div className="room-item-price">
                <p><span>{`${listRoomItem.giaTien}$`}</span>/ đêm</p>
            </div>
        </div>
    </div>
  )
}

export default RoomItem