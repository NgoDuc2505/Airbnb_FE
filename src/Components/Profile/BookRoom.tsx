import { useEffect, useState } from 'react'
import { IBookRoom } from '../../constant/constant';
import { axiosInterceptorWithCybertoken } from '../../services/services';
import RoomItem from '../Room-item/RoomItem';


interface IProps{ 
    bookRoom: IBookRoom | any
}

function BookRoom({bookRoom}: IProps){
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
            <RoomItem listRoomItem={bookRoomList}/>
        </div> 
    )
}

export default BookRoom