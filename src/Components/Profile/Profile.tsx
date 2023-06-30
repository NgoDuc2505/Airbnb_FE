import { ACCESS_USER_ID, IBookRoom, IProfile, IRoomDetail } from "../../constant/constant"
import { axiosInterceptorWithCybertoken } from "../../services/services"
import BookRoom from "./BookRoom"
import React, { useEffect, useState } from 'react'
import {Pagination} from 'antd'
import "./profile.scss"
import { getLocal } from "../../utils/utils"


interface IProps{
    profileData: IProfile | any,
    bookRoomData: IBookRoom[]
}

const PAGE_SIZE = 2; 

export function Profile({profileData, bookRoomData}: IProps){ 
    const [data, setData] = useState([])
    const [hide, setHide] = useState(true)
    const [page, setPage] = useState(1)
    
    useEffect(()=>{
        if (bookRoomData != undefined){
            let newData : any= bookRoomData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
            setData(newData)
        }
    },[page])

    // useEffect(() => { 
    //     let newData: any = 
    //     setData(newData)
    // }, [])
    
    return (
        <div className="profile-page row mb-5">
            <div className="profile-section col-lg-3">
                <div className="profile-fixed">
                    <div className="profile-avatar">
                        <img src={profileData.avatar === ""? "/src/assets/Image/emptyAva.jpg" : profileData.avatar} alt="" />
                        <p className="profile-text-highlight">Cập nhật ảnh</p>
                    </div>
                    <div className="profile-section-description">
                        <i className="fa-regular fa-circle-check"></i>
                        <h3>Xác Minh Danh Tính</h3>
                        <p>Xác thực danh tính của bạn với huy hiệu xác minh danh tính</p>
                        <button className="profile-button" type="button">Nhận Huy Hiệu</button>
                        <hr className="my-4" />
                        <h2>{profileData.name} đã xác nhận</h2>
                        <p className="mt-3"><i className="fa-solid fa-check mr-2"></i>Địa chỉ Email</p>
                    </div>                
                </div>
            </div>
            <div className="profile-bookRoom-section col-lg-9 pl-lg-5 mt-5 mt-lg-0">
                <h1>Xin Chào, tôi là {profileData.name}</h1>
                <p>Bắt đầu tham gia vào năm 2021</p>
                <p className="profile-text-highlight">Chỉnh sửa hồ sơ</p>
                <h1 className="mt-4">Phòng đã thuê</h1>


                {hide ? <div></div> :
                <div>
                    {data.length >= 0 && data.map((booked: IBookRoom) => { 
                        return(
                            <BookRoom key={booked.id} bookRoom={booked}/>
                        )
                    })}
                    
                    <div className='d-flex justify-content-center mt-5'>
                    {
                        bookRoomData && (bookRoomData.length / PAGE_SIZE) > 1 && (
                            <Pagination
                                total={bookRoomData.length}
                                current={page}
                                pageSize={PAGE_SIZE}
                                onChange={(page) => setPage(page)}
                            />
                        )
                    }
                    </div>
                </div>
                  
                }      
                <button className="profile-button mt-3" type='button' onClick={() => {
                    setHide(!hide); 
                    if(data.length===0) {
                        let newData: any= [bookRoomData[0],bookRoomData[1]]
                        setData(newData)
                    }
                }}>{hide? `Hiển thị ${bookRoomData.length} phòng đã đặt` : "Ẩn hiện thị phòng"}</button>
              
                
            </div>  
        </div>
    )
}