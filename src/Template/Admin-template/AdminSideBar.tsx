
import { NavLink } from 'react-router-dom'
import './admin.scss'

interface IProps {
  handleCloseSideBar: ()=> void
}

function AdminSideBar({handleCloseSideBar}:IProps) {
  return (
    <div className='side-bar-admin'>
        <NavLink to={'/@@admin/user'} onClick={handleCloseSideBar}><i className="fa-regular fa-user"></i>Quản lý người dùng</NavLink>
        <NavLink to={'/@@admin/location'} onClick={handleCloseSideBar}><i className="fa-solid fa-location-dot"></i>Quản lý địa điểm</NavLink>
        <NavLink to={'/@@admin/roomdetail'} onClick={handleCloseSideBar}><i className="fa-solid fa-person-shelter"></i>Quản lí thông tin phòng</NavLink>
        <NavLink to={'/@@admin/booked'} onClick={handleCloseSideBar}><i className="fa-regular fa-id-card"></i>Quản lý đặt phòng</NavLink>
        <NavLink to={'/'}><i className="fa-solid fa-house"></i>Về trang chủ</NavLink>
    </div>
  )
}

export default AdminSideBar
