// import React from 'react'
import { useState } from 'react'
import ButtonHeader from '../Button-header-login/Button'
import './headerHome.scss'

function HeaderHome() {
    const [active, setActive] = useState([false,false,false,false])
    const [show, setShow] = useState(false)
    const handleSetShow = (): void => {
        setShow(!show)
    }
    const handleSetActive = (index:number):void =>{
        const partern: boolean[] = [false,false,false,false];
        partern[index] = true;
        setActive([...partern])
    }
    return (
        <div className='header-home'>
            <div className="container-header">
                <div className="left-header">
                    <img src="/src/assets/Image/Airbnb_logo.png" alt="..." />
                </div>
                <div className="mid-wrapper">
                    <div className={`mid-header ${!show ? '' : 'hide'}`}>
                        <div className="layer" onClick={handleSetShow}></div>
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
                    <div className={`zoomout-comonent ${show ? 'show' : ''}`}>
                        <div className="above-content">
                            <p>Chỗ ở</p>
                            <p>Trải nghiệm</p>
                            <p>Trải nghiệm trực tuyến</p>
                            <button className='close-btn' onClick={handleSetShow}>x</button>
                        </div>
                        <div className="under-content">
                            <div className={`reach-location under-content-text ${active[0] ? 'active' : ''}`} onClick={()=>{handleSetActive(0)}}>
                                <p>Dia diem</p>
                                <input type="text" placeholder='Tim kiem diem den' />
                            </div>
                            <div className={`date-checkin under-content-text ${active[1] ? 'active' : ''}`} onClick={()=>{handleSetActive(1)}}>
                                <p>Nhan phong</p>
                                <span>Them ngay</span>
                            </div>
                            <div className={`date-checkout under-content-text ${active[2] ? 'active' : ''}`} onClick={()=>{handleSetActive(2)}}>
                                <p>Tra phong</p>
                                <span>Them ngay</span>
                            </div>
                            <div className={`search-check under-content-text ${active[3] ? 'active' : ''}`} onClick={()=>{handleSetActive(3)}}>
                                <div className="search-check-content">
                                    <p>Khach</p>
                                    <span>Them khach</span>
                                </div>
                                <button className='search-btn-check'>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </div>
                        <div className="sub-content">
                            
                        </div>
                    </div>
                </div>
                <div className="right-header">
                    <p>Cho thuê chỗ ở qua Airbnb</p>
                    <i className="fa-solid fa-globe"></i>
                    <ButtonHeader>
                        <div className="login-area">
                            <i className="fa-solid fa-bars"></i>
                            <i className="fa-solid fa-user user-login"></i>
                        </div>
                    </ButtonHeader>
                </div>
            </div>
        </div>
    )
}

export default HeaderHome