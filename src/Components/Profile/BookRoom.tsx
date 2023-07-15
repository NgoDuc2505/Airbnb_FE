import { useEffect, useState } from 'react'
import { IBookRoom } from '../../constant/constant';
import { axiosInterceptorWithCybertoken } from '../../services/services';
import RoomItem from '../Room-item/RoomItem';
import { Collapse } from 'antd';
import { UpdateBooking } from './UpdateBooking';


interface IProps{ 
    bookRoom: IBookRoom | any
    index: number
}

function BookRoom({bookRoom,index}: IProps){
    const [bookRoomList, setBookRoom]= useState({
        id: 0,
        tenPhong:'',
        tivi: false,
        phongNgu: 0,
        phongTam: 0,
        khach: 0,
        giuong: 0,
        giaTien: 0,
        maViTri: -1,
        mayGiat: false,
        wifi: false,
        banLa: false,
        banUi: false,
        bep: false,
        dieuHoa: false,
        doXe: false,
        moTa:'',
        hinhAnh: '',
        hoBoi: false,
    })

    useEffect(() => { 
        try{ 
            const resp = async() => await axiosInterceptorWithCybertoken.get(`/api/phong-thue/${bookRoom.maPhong}`)
            resp().then((response) => {
                setBookRoom(response.data.content)})
            
        }catch(err){ 
            console.log(err)
        }
    }, [bookRoom])
    return (
        <div>
            <hr style={{border:"solid 1px black", }}/>
            <h2>Phòng {index + 1}</h2>
            <RoomItem listRoomItem={bookRoomList}/>
            <Collapse
                items={[{ key: '1', label: 'Hiển thị thêm thông tin', children: 
                <div>
                    <h3>Ngày đến: <span style={{fontWeight: "400"}}>{bookRoom.ngayDen}</span></h3>
                    <h3>Ngày đi: <span style={{fontWeight: "400"}}>{bookRoom.ngayDi}</span></h3>
                    <h3>Số khách: <span style={{fontWeight: "400"}}>{bookRoom.soLuongKhach}</span></h3>
                    <div className='d-flex justify-content-end'>
                        <UpdateBooking bookRoom={bookRoom} khachMax={bookRoomList.khach}/>
                    </div>
                </div>
            }]}
            />

            <hr style={{border:"solid 1px black", }}/>
        </div> 
    )
}

export default BookRoom