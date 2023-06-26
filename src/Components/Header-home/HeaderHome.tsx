//component
import ButtonHeader from '../Button-header-login/Button'
import BasicModal from '../Modal/ModalLocation'
import './headerHome.scss'
//react plugin
import { useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'


function HeaderHome() {
    const inputRef = useRef<null | HTMLInputElement>(null)
    const [active, setActive] = useState([true, false, false, false])
    const [show, setShow] = useState(false)
    const [valueInput, setValue] = useState('')
    const handleSetShow = (): void => {
        setShow(!show)
    }
    const handleSetActive = (index: number): void => {
        const partern: boolean[] = [false, false, false, false];
        partern[index] = true;
        setActive([...partern])
        if (index === 0) {
            inputRef.current?.focus()
        }
    }

    return (
        <div className={`header-home ${show ? 'mb-84' : ''}`}>
            <div className={`header-home-layer ${show ? 'h-205' : ''}`}></div>
            <div className="container-header">
                <div className="left-header">
                    <NavLink to={''}>
                        <img src="/src/assets/Image/Airbnb_logo.png" alt="..." />
                    </NavLink>
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
                    <div className={`mid-header-mobile ${!show ? '' : 'hide'}`}>
                        <div className="layer" onClick={handleSetShow}></div>
                        <div className="mid-header-mobile-content">
                        <p>Tìm kiếm...</p>
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
                            <div className={`reach-location under-content-text ${active[0] ? 'active' : ''}`} onClick={() => { handleSetActive(0) }}>
                                <BasicModal value={valueInput} setValue={setValue}>
                                    <div>
                                        <p>Dia diem</p>
                                        <span className='under-content-span'>{valueInput ? valueInput : 'Hãy nhập địa điểm tìm kiếm'}</span>
                                        <span className='mobile-span'>{valueInput ? valueInput : 'Hãy nhập địa điểm'}</span>
                                    </div>
                                </BasicModal>
                            </div>
                            <div className={`date-checkin under-content-text ${active[1] ? 'active' : ''}`} onClick={() => { handleSetActive(1) }}>
                                <p>Nhan phong</p>
                                <span>Them ngay</span>
                            </div>
                            <div className={`date-checkout under-content-text ${active[2] ? 'active' : ''}`} onClick={() => { handleSetActive(2) }}>
                                <p>Tra phong</p>
                                <span>Them ngay</span>
                            </div>
                            <div className={`search-check under-content-text ${active[3] ? 'active' : ''}`} onClick={() => { handleSetActive(3) }}>
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
                    <p className={!show ? 'right-header-title' : 'hide'}>Cho thuê chỗ ở qua Airbnb</p>
                    <p className={!show ? 'right-header-sub' : 'hide right-header-sub'}>Cho thuê chỗ ở</p>
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