
import Button from '@mui/material/Button';
import { IRoomDetail } from '../../constant/constant'
import './addRoom.scss'
interface IProps {
    handleCloseModal: ()=> void,
    data: IRoomDetail,
    handleUpdate:()=>void
}

function DetailRoom({handleCloseModal,data,handleUpdate}:IProps) {
   
  return (
    <div className='admin-detai-room'>
        <h2>{data.tenPhong}</h2>
        <div className="detail">
        <p className='desc'>Mô tả: <span>{data.moTa.split('\r\n').join(',')}</span></p>
        <img src={data.hinhAnh} alt={`...${data.id}...`} />
        </div>
        <div className="sub-info">
        <p>Giá tiền: <span>{`${data.giaTien}$`}</span></p>
        <p>Mã vị trí: <span>{data.maViTri}</span></p>
        <h3>Tiện ích:</h3>
        <ul className='extra-ben'>
            <li>Máy giặt: <span>{data.mayGiat? 'Có' : 'Không'}</span> </li>
            <li>Bếp: <span>{data.bep? 'Có' : 'Không'}</span></li>
            <li>Hồ bơi: <span>{data.hoBoi? 'Có' : 'Không'}</span></li>
            <li>Điều hòa: <span>{data.dieuHoa? 'Có' : 'Không'}</span></li>
            <li>Tivi: <span>{data.tivi? 'Có' : 'Không'}</span></li>
            <li>Bàn là: <span>{data.banLa? 'Có' : 'Không'}</span></li>
            <li>Đỗ xe: <span>{data.doXe? 'Có' : 'Không'}</span></li>
            <li>Wifi: <span>{data.wifi? 'Có' : 'Không'}</span></li>
            <li>Phòng ngủ: <span>{data.phongNgu}</span></li>
            <li>Giường: <span>{data.giuong}</span></li>
            <li>Phòng tắm: <span>{data.phongTam}</span></li>
        </ul>
        </div>
        <div className="cancel-btn">
        <Button variant="contained" onClick={()=>{handleCloseModal();handleUpdate()}}>Sửa</Button>
        <Button variant="contained" onClick={()=>{handleCloseModal()}}>Đóng</Button>
        </div>
    </div>
  )
}

export default DetailRoom