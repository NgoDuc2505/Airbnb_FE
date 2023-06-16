import React from 'react'
import './roomItem.scss'
function RoomItem() {
  return (
    <div className='room-item'>
        <div className="icon-favorite">
        <i className="fa-regular fa-heart"></i>
        </div>
        <div className="room-item-img">
        <img src="https://airbnbnew.cybersoft.edu.vn/images/phong6.png" alt="..." />
        </div>
        <div className="room-item-content">
            <div className="room-item-title">
                <p>Toàn bộ căn hộ, khách sạn tại địa điểm</p>
                <h2>Ngôi nhà có hoa, nắng đẹp, trung tâm Cần Thơ</h2>
            </div>
            <hr className='hr-item' />
            <div className="room-item-detail">
                <p>Tự nhận phòng\r\nTự nhận phòng với hộp khóa an toàn.\r\nDang là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.</p>
            </div>
            <div className="room-item-price">
                <p><span>28$</span>/ đêm</p>
            </div>
        </div>
    </div>
  )
}

export default RoomItem