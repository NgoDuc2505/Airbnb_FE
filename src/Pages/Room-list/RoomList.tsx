
import './roomList.scss'
//MUI UI
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import RoomItem from '../../Components/Room-item/RoomItem';
//constant
import { IRoomDetail } from '../../constant/constant'
import useRoomList from './roomListLogic';

function RoomList() {
  const stateData =useRoomList()
  const handleChipClick = () => {
    return 1
  }
  return (
    <div className='room-list'>
      <div className="room-list-left">
        <div className="header-room-list">
          <div className="title-room-list">
            <p>{`Hiện có ${stateData.length} chỗ ở.`}</p>
            <h1>Chỗ ở tại khu vực bạn đã chọn</h1>
          </div>
          <Stack direction="row" spacing={1} className='mui-ui-stack'>
            <Chip className='mui-ui-chip' label="Loại nơi ở" variant="outlined" sx={{ fontSize: '1.4rem' }} onClick={handleChipClick} />
            <Chip className='mui-ui-chip' label="Giá" variant="outlined" sx={{ fontSize: '1.4rem' }} onClick={handleChipClick} />
            <Chip className='mui-ui-chip' label="Đặt ngay" variant="outlined" sx={{ fontSize: '1.4rem' }} onClick={handleChipClick} />
            <Chip className='mui-ui-chip' label="Phòng ngủ" variant="outlined" sx={{ fontSize: '1.4rem' }} onClick={handleChipClick} />
            <Chip className='mui-ui-chip' label="Bộ lọc khác" variant="outlined" sx={{ fontSize: '1.4rem' }} onClick={handleChipClick} />
          </Stack>
          <div className="room-item-list">
            {stateData.map((item: IRoomDetail)=>{
              return <RoomItem key={item.id} listRoomItem={item}/>
            })}
          </div>
        </div>
      </div>
      <div className="room-list-right">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.55774659851!2d108.21402507518673!3d16.036521540312595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421966c1cc3011%3A0x7ffe08b3ab7e4b46!2zOTYgTmfDtCBU4bqldCBU4buRLCBIb8OgIEPGsOG7nW5nIELhuq9jLCBI4bqjaSBDaMOidSwgxJDDoCBO4bq1bmcgNTUyMjAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1686886174045!5m2!1svi!2s" width={600} height={550} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </div>
  )
}

export default RoomList