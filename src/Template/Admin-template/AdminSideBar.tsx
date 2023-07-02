import React from 'react'
import { NavLink } from 'react-router-dom'
import './admin.scss'
function AdminSideBar() {
  return (
    <div className='side-bar-admin'>
        <NavLink to={'/admin/user'}><i className="fa-regular fa-user"></i>Quản lý người dùng</NavLink>
        <NavLink to={'/admin/location'}><i className="fa-solid fa-location-dot"></i>Quản lý địa điểm</NavLink>
        <NavLink to={'/admin/roomdetail'}><i className="fa-solid fa-person-shelter"></i>Quản lí thông tin phòng</NavLink>
        <NavLink to={'/admin/subscriptionroom'}><i className="fa-regular fa-id-card"></i>Quản lý đặt phòng</NavLink>
    </div>
  )
}

export default AdminSideBar
