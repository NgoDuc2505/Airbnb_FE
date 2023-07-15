import { ACCESS_USER_ID, IBookRoom, IProfile } from "../../constant/constant"
import BookRoom from "./BookRoom"
import React, { useEffect, useState } from 'react'
import {Pagination} from 'antd'
import "./profile.scss"
import UpdateProfile from "./UpdateProfile"
import { PAGE_SIZE } from '../../constant/constant'
import { axiosInterceptor } from '../../services/services';
import { getProfileData } from '../../redux/user-slice/UserSlice'
import { AppDispatch } from '../../redux/store';
import { useDispatch } from "react-redux"
import { getLocal } from "../../utils/utils"
import swal from 'sweetalert';
import Button from '@mui/material/Button';
interface IProps{
    profileData: IProfile | any,
    bookRoomData: IBookRoom[]
}

export function Profile({profileData, bookRoomData}: IProps){ 
    const dispatch = useDispatch<AppDispatch>()
    const [data, setData] = useState<IBookRoom[]>([])
    const [hide, setHide] = useState(true)
    const [page, setPage] = useState(1)
    const [file,setFile] = useState<File | null | Blob >(null)
    useEffect(()=>{
        if (bookRoomData != undefined){
            const newData : IBookRoom[]= bookRoomData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
            setData(newData)
        }
    },[page, bookRoomData])

    const handleChangeFile =(e: React.ChangeEvent<HTMLInputElement>)=>{
        if((e.target.files) !== null){
            setFile(e.target.files[0])
        }
    }
    const handleUpdateAva =async ()=>{
        try{
            const formFile = new FormData()
            if(file !== null){
                formFile.append("formFile", file)
                await axiosInterceptor.post('api/users/upload-avatar', formFile)
            }
            dispatch(getProfileData(getLocal(ACCESS_USER_ID)))
            swal(`Thành công cập nhật hình ảnh`, { icon: "success" })
            setFile(null)
        }catch(err){
            swal(`Thất bại, Dung lượng hình phải dưới 1Mb`, { icon: "error" })
        }
    }
    return (
        <div>            
            <div className="profile-page row mb-5">
                <div className="profile-section col-lg-3">
                    <div className="profile-fixed">
                        <div className="profile-avatar">
                            <img src={!profileData?.avatar ? "/src/assets/Image/emptyAva.jpg" : profileData?.avatar} alt="" />
                            <div className="update-avatar">
                            <input type="file" className="profile-text-highlight" title="Cập nhật ảnh" onChange={handleChangeFile}/>
                            <Button variant="contained" onClick={handleUpdateAva}>Cập nhật ảnh</Button>
                            </div>
                        </div>
                        <div className="profile-section-description">
                            <i className="fa-regular fa-circle-check"></i>
                            <h3>Xác Minh Danh Tính</h3>
                            <p>Xác thực danh tính của bạn với huy hiệu xác minh danh tính</p>
                            <button className="profile-button" type="button">Nhận Huy Hiệu</button>
                            <hr className="my-4" />
                            <h2>{profileData?.name} đã xác nhận</h2>
                            <p className="mt-3"><i className="fa-solid fa-check mr-2"></i>Địa chỉ Email</p>
                        </div>                
                    </div>
                </div>
                <div className="profile-bookRoom-section col-lg-9 pl-lg-5 mt-5 mt-lg-0">
                    <h1>Xin Chào, tôi là {profileData?.name}</h1>
                    <p>Bắt đầu tham gia vào năm 2021</p>
                    <UpdateProfile profileData={profileData}/>
                    
                    <h1 className="mt-4">Phòng đã thuê</h1>


                    {hide ? <div></div> :
                    <div>
                        {data.length >= 0 && data.map((booked: IBookRoom, index: number) => { 
                            return(
                                <BookRoom index={index} key={booked?.id} bookRoom={booked}/>
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

                    {bookRoomData?.length === 0 ? "Bạn chưa đặt phòng nào" :
                    <button className="profile-button mt-3" type='button' onClick={() => {
                        setHide(!hide); 
                        if(data.length===0) {
                            let newData: IBookRoom[] = [bookRoomData[0],bookRoomData[1]]

                            if (bookRoomData.length === 1) {
                                newData = [bookRoomData[0]]
                            }

                            setData(newData)
                        }
                    }}>{hide?  `Hiển thị ${bookRoomData?.length} phòng đã đặt` : "Ẩn hiện thị phòng"}</button>}
                
                    
                </div>  
            </div>
            
        </div>
    )
}