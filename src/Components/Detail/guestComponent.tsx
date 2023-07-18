import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// import mui guest input
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// import date picker
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// import css
import "./detail.scss"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // 

import { DateRange } from 'react-date-range';

import { getLocal } from '../../utils/utils';
import { ACCESS_USER_ID, IRoomDetail } from '../../constant/constant';
import { axiosInterceptorWithCybertoken } from '../../services/services';
import swal from 'sweetalert';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { AppDispatch } from '../../redux/store'
import { getListBookedRoom } from '../../redux/Admin-slice/AdminBookingSlice'
import useCheckAvailableCount from './handleCheckAvailable';
dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

//declare format
const dateFormat = 'YYYY/MM/DD';


interface IProps{
  giaTien: number,
  khachMax: number,
  phone: boolean,
  dataDetail: IRoomDetail

}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  height: "100%",
  bgcolor: '#e6e3e3',
  border: '2px solid #000',
  boxShadow: 24,
  overflow: 'auto'
 
};

const styleGuest = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: "10px",
  transform: 'translate(-50%, -50%)',
  width: "95%",
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  overflow: 'auto'
 
};

export default function SelectVariants({khachMax, giaTien, phone, dataDetail} : IProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [checkPayment, setCheckPayment] = React.useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const [openGuest, setOpenGuest] = React.useState(false);
  const handleCloseGuest = () => setOpenGuest(false)
  const [openDate, setOpenDate] = React.useState(false);
  const handleCloseDate = () => setOpenDate(false)

  const [phoneDate, setPhoneDate] = React.useState<any>([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  const idRoom = useParams()
  const navigate = useNavigate()
  const [inputGuest, setInputGuest] = React.useState("1 guest");
  const [guest, setGuest] = React.useState(1);
  const [dateStart, setDateStart] = React.useState("")
  const [dateEnd, setDateEnd] = React.useState("")
  const [inputFilled, setInputFilled] = React.useState(false)
  const [dateDifferent, setDateDifferent] = React.useState(0)
  React.useEffect(()=>{
    dispatch(getListBookedRoom())
  },[])
  const availableCount = useCheckAvailableCount(idRoom.idDetail, dateStart, dateEnd)
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
    return inputGuest
  };

  const handleGuest = (index: number) => { 
    setGuest(guest + index)
  }
  const handleBooking = async() => {
    if (!inputFilled){
      swal("Bạn chưa điền ngày đến ngày đi!", {icon: "error"})
    } else {
      if (getLocal(ACCESS_USER_ID)){
        if(availableCount < 1){
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
            navigate('/Detail/profile')
          } catch (err){ 
            swal("Thuê phòng thất bại!", {icon: "error"})
            console.log(err)
          }
        }else { 
          swal("Phòng hiện tại không có sẵn trong ngày bạn đã đặt!", {icon: "error"})
        }
        }else{
          swal({
            title: "Bạn chưa đăng nhập!",
            text: "Bạn phải đăng nhập để có thể đặt phòng!",
            icon: "warning",
            buttons: [true,"Đăng nhập"],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Bạn đã được chuyển trang đăng nhập", {
                icon: "success",
              });
              navigate("/auth/login")
            } else {
              swal("Bạn sẽ tiếp tục với tư cách là khách!");
              navigate("/")
            }
          });
        }
    }
  }

  const handleDate = (event: any) => { 
    if (phone) { 
      try{ 
        setDateStart(event[0].startDate)
        setDateEnd(event[0].endDate)
      } catch{
        setDateStart("")
        setDateEnd("")
        setDateDifferent(0)
      }
    } else { 
      try{
        setDateStart(event[0].$d)
        setDateEnd(event[1].$d)
      }catch{
        setDateStart("")
        setDateEnd("")
        setDateDifferent(0)
      }
    }
    
    
  }
  return !phone?(
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
        {!inputFilled? "Thuê nhà": "Check availability"}
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
  ) : (

    <div>

      <Button onClick={handleOpen}>Reserve</Button>

      <Modal
        open={openDate}
        onClose={handleCloseDate}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{...styleGuest}}>
          <div className='d-flex justify-content-center mt-5'>
            <DateRange
              editableDateInputs={true}
              onChange={item => {
                setPhoneDate([item.selection])}}
              moveRangeOnFirstSelection={false}
              ranges={phoneDate}
            />
          </div>
          <button className="guest-close my-4 ml-5" onClick={() =>  {
            setOpenDate(false)
            handleDate(phoneDate)
          }
            }>Close</button>
        </Box>

      </Modal>
      
      <Modal
        open={openGuest}
        onClose={handleCloseGuest}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{...styleGuest}}>
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
              <button className="guest-close mb-4 ml-5" onClick={() =>  {setOpenGuest(false)}}>Close</button>
        </Box>
      </Modal>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className= "detail-phone-box">
            <header className='booking-header'> 
              <button type='button' onClick={() => {setOpen(false)}}><i className="fa-solid fa-less-than"></i></button>
              <h3>{inputFilled? "Confirm and pay" :"Request to book"}</h3>
            </header>
            <section className='booking-main' style={{}}>
              <section className='booking-detail'>
                <img src={dataDetail.hinhAnh} alt="" />
                <div>
                  <p>Phòng</p>
                  <h5>{dataDetail.tenPhong}</h5>
                </div>
              </section>  

              <section className='booking-room'>
                <h1 className='mt-2 mb-5'>Your trip</h1>
                <div className='booking-room-date mb-3'>
                  <div>
                    <h3>Dates</h3>
                    <p>{dateDifferent !== 0 && !Number.isNaN(dateDifferent) ? ` ${new Date(dateStart).toLocaleDateString('en-CA')} - ${new Date(dateEnd).toLocaleDateString('en-CA')}` : "Bạn chưa chọn ngày"}</p>
                  </div>
                  <h3 className='edit-booking' onClick={() => {setOpenDate(true)}}>Edit</h3>
                </div>
                <div className='booking-room-guest'>
                  <div>
                    <h3>Guest</h3>
                    <p>{guest} guest</p>
                  </div>
                  <h3 className='edit-booking' onClick={() => {setOpenGuest(true)}}>Edit</h3>
                  
                </div>
              </section>  

              <section className='booking-payment'>
                <h1>Choose how to pay</h1>
                <div>
                  <div className={`form-check ${!checkPayment ? "active" : ""}`}>
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      <h2>Pay in full</h2>
                      <p>{inputFilled ? `Trả đầy đủ ${giaTien * dateDifferent} USD`: "Chưa thế tính giá tiền"}</p>
                    </label>
                    <div className='radio-button'>
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked onChange={() => {setCheckPayment(false)}}/>
                    </div>
                  </div>
                  <div className={`form-check ${checkPayment ? "active" : ""}`}>
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      <h2>Pay part now, part later</h2>
                      <p>{inputFilled ? `Trả ${giaTien * dateDifferent} USD theo thời gian mà bạn chọn`: "Chưa thế tính giá tiền"}</p>
                    </label>
                    <div className='radio-button'>
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  onChange={() => {setCheckPayment(true)}} />
                    </div>
                  </div>
                </div>

              </section>    
              <section className='booking-paying-price'>
                <h1>Price Detail</h1>
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

              <button className="detail-submit-guest" type='button' onClick={handleBooking}>
                {!inputFilled? "Check availability": "Thuê nhà"}
              </button>
              </section> 
              
            </section>

            <footer className='booking-footer'>
              <div className='d-flex'>
                <i className="fa-solid fa-globe mr-2 mt-1"></i>
                <h4>Engish  $ USD</h4>
              </div>
              <p className='mt-4'>© 2023 Dang Khoa & Minh Duc, Inc.</p>
              <p>Privacy · Terms · Sitemap</p>
            </footer>
          </div>
        </Box>
      </Modal>
    </div>
  )
}