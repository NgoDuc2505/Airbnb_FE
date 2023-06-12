// import React from 'react'
import './headerHome.scss'
function HeaderHome() {
    return (
        <div className='header-home'>
            <div className="container-header">
                <div className="left-header">
                    <img src="/src/assets/Image/Airbnb_logo.png" alt="..." />
                </div>
                <div className="mid-header">
                    <div className="location-random">
                        <p>Địa điểm bất kỳ</p>
                    </div>
                    <div className="week">
                        <p>tuần bất kỳ</p>
                    </div>
                    <div className="add-customer">
                        <p>Thêm khách</p>
                        <button className='search-btn'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>
                <div className="right-header">
                    <p>Cho thuê chỗ ở qua Airbnb</p>
                    <i className="fa-solid fa-globe"></i>
                    <div className="login-area">
                        <i className="fa-solid fa-bars"></i>
                        <i className="fa-solid fa-user user-login"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderHome