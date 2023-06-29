import * as React from 'react';

// import mui guest input
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// import date picker
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// import css
import "./detail.scss"
import { getLocal } from '../../utils/utils';
import { ACCESS_USER_ID } from '../../constant/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInterceptorWithCybertoken } from '../../services/services';
import swal from 'sweetalert';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

//declare format
const dateFormat = 'YYYY/MM/DD';


interface IProps{
  giaTien: number
  khachMax: number,
}


export default function SelectVariants({khachMax, giaTien} : IProps) {
  const idRoom = useParams()
  const navigate = useNavigate()
  const [inputGuest, setInputGuest] = React.useState("1 guest");
  const [guest, setGuest] = React.useState(1);
  const [dateStart, setDateStart] = React.useState("")
  const [dateEnd, setDateEnd] = React.useState("")
  const [inputFilled, setInputFilled] = React.useState(false)
  const [dateDifferent, setDateDifferent] = React.useState(0)

  React.useEffect(() => { 
    setDateDifferent(
      Math.ceil(Math.abs(Date.parse(dateEnd) - Date.parse(dateStart)) / (1000 * 60 * 60 * 24)))
    
    if (dateDifferent === 0){
      setInputFilled(false)
    }else if(dateEnd != "" && dateStart != "" && guest != 0){ 
      setInputFilled(true)
    }else { 
      setInputFilled(false)
    }
  }, [dateEnd, dateStart, dateDifferent])

  const handleChange = (event: SelectChangeEvent) => {
    setInputGuest(event.target.value);
  };

  const handleGuest = (index: number) => { 
    setGuest(guest + index)
  }

  const handleBooking = async() => {
    if (!inputFilled){
      alert("Bạn chưa điền ngày đến ngày đi")
    } else {
      if (getLocal(ACCESS_USER_ID)){
        try {
          const value = { 
            maPhong: idRoom.idDetail,
            ngayDen: dateStart,
            ngayDi: dateEnd,
            soLuongKhach: guest,
            maNguoiDung: getLocal(ACCESS_USER_ID)
          }
          await axiosInterceptorWithCybertoken.post("/api/dat-phong", value)
          setDateEnd("")
          setDateStart("")
          setGuest(1)
          swal("Thuê phòng thành công!", {icon: "success"})
        } catch (err){ 
          swal("Thuê phòng thất bại!", {icon: "error"})
          console.log(err)
        }
      }else { 
        navigate("/auth/login")
      }
    }
  }

  const handleDate = (event: any) => { 
    try{
      setDateStart(event[0].$d)
      setDateEnd(event[1].$d)
    }catch{
      setDateStart("")
      setDateEnd("")
      setDateDifferent(0)
    }
    
  }

  return (
    <div className='my-3'>
      <RangePicker
        className='detail-range-picker'
        onChange={handleDate}
        format={dateFormat}
      />

      <FormControl variant="filled" sx={{color:"black", width:"100%", border:"solid 1px", padding:"0.5rem",borderRadius:"0 0 10px 10px"}}>
        <InputLabel id="demo-simple-select-filled-label" sx={{fontSize:"2rem", color:"black"}}>{guest} Guest</InputLabel>
        <Select
          sx={{backgroundColor:"white"}}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={handleChange}
        >
              <div className='d-flex align-items-center justify-content-between'>
                <div className='ml-5 mt-4'>
                  <h3>Adults</h3>
                  <h5>Age 13+</h5>
                </div>
                <div className='d-flex align-items-center'>
                  <button disabled={guest === 1?true:false} id="decGuest" type="button" className='guest-Button' onClick={() => {handleGuest(-1)}}>-</button>
                  
                    <h2>{guest}</h2>
                
                  <button disabled={guest === khachMax?true:false} id="incGuest" type="button" className='guest-Button' onClick={() => {handleGuest(1)}}>+</button>
                </div>
              </div>
              <p className="guest-description">This place has a maximum of {khachMax} people</p>
              <button className="guest-close mb-4" style={{marginLeft:"80%"}}>Close</button>
        </Select>
      </FormControl>
      <button className="detail-submit-guest" type='button' onClick={handleBooking}>
        {!inputFilled? "Check availability": "Thuê nhà"}
      </button>

      {!inputFilled ?
        <p className='text-center'>
          Enter dates and number of guests to check the total trip price, including additional fees and any taxes.
        </p>
       :
        <div>
          <p className='text-center'>
            Bạn chưa bị tính tiền
          </p>
          <div className='detail-fees'>
            <p>
              ${giaTien} USD x {dateDifferent} nights
            </p> 
            <p>
              {giaTien * dateDifferent} USD
            </p>
          </div>
          <hr/>
          <div className='detail-fees-total'>
            <p>
              Total
            </p> 
            <p>
              {giaTien * dateDifferent} USD
            </p>
          </div>
        </div>
       }
    </div>
  );
}