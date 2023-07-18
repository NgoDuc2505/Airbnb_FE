import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { IBookRoom } from '../../constant/constant';
import * as Yup from 'yup';
import { FormControl, FormHelperText, Grid, Input, InputLabel } from '@mui/material';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // 
import { axiosInterceptorWithCybertoken } from '../../services/services';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getRoomByUserId } from '../../redux/Detail-slice/DetailSlice';
import useCheckAvailableCount from '../Detail/handleCheckAvailable'
import { getListBookedRoom } from '../../redux/Admin-slice/AdminBookingSlice'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


interface IProps {
    bookRoom: IBookRoom | any,
    khachMax: number
}

export function UpdateBooking({ bookRoom, khachMax }: IProps) {
    const dispatch = useDispatch<AppDispatch>()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [dateStart, setDateStart] = React.useState("")
    const [dateEnd, setDateEnd] = React.useState("")
    const [isAvai,setAvai]= React.useState(false)
    const [phoneDate, setPhoneDate] = React.useState<any>([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const [phoneError, setPhoneError] = React.useState("")

    React.useEffect(() => {
        if ((phoneDate[0].endDate - phoneDate[0].startDate) === 0) {
            setPhoneError("Ngày đến và ngày đi không được trùng nhau")
        } else {
            setPhoneError("")
        }

    }, [phoneDate])
    React.useEffect(()=>{
        dispatch(getListBookedRoom())
        
      },[])
    const availableCount = useCheckAvailableCount(bookRoom.maPhong,dateStart, dateEnd, bookRoom.id)
    const formik = useFormik({
        initialValues: {
            id: bookRoom.id,
            maPhong: bookRoom.maPhong,
            maNguoiDung: bookRoom.maNguoiDung,
            ngayDen: bookRoom.ngayDen,
            ngayDi: bookRoom.ngayDi,
            soLuongKhach: bookRoom.soLuongKhach,
        },
        validationSchema: Yup.object().shape({
            soLuongKhach: Yup.number().required('Số lượng khách can not be empty').min(1, "Số lượng khách phải lớn hơn 0").max(khachMax, `Số lượng khách lớn nhất mà bạn có thể đặt là ${khachMax}`)
        }),

        onSubmit: async (values: IBookRoom | any) => {
            try {

                let newValue = {
                    ...values
                }

                if (phoneDate[0].endDate !== null) {
                    if(isAvai){
                        newValue = {
                            ...values,
                            ngayDen: phoneDate[0].startDate,
                            ngayDi: phoneDate[0].endDate
                        }
                    }else{
                        newValue = {
                            undefined
                        }
                    }
                }


                if (phoneError === "") {
                    await axiosInterceptorWithCybertoken.put(`/api/dat-phong/${newValue.id}`, newValue)

                    dispatch(getRoomByUserId(newValue.maNguoiDung))

                    swal(`Thành công, Update thành công khách hàng`, {
                        icon: "success",
                    });
                    handleClose()
                }

            } catch (error) {
                console.log(error)
                swal("Thất bại sửa phòng", {
                    icon: "error",
                });
            }

        }
    })
    const handleCheckAvailable = async ()=>{
        setDateStart(phoneDate[0].startDate)
        setDateEnd(phoneDate[0].endDate)
        if(availableCount < 1){
            setAvai(true)
            swal(`Phòng có sẵn`, {
                icon: "success",
            });
        }else{
            setAvai(false)
            swal(`Phòng không có sẵn, liên hệ với nhân viên qua cổng hỗ trợ để sửa thông tin`, {
                icon: "warning",
            });
        }
    }

    return (
        <div>
            <Button onClick={handleOpen} sx={{ fontSize: "1.5rem", border: "solid 0.5px black", color: "green" }}>Sửa</Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='Modal-update-Booking' sx={style}>
                    <h1 className='mb-4'>Sửa thông tin đặt phòng</h1>
                    <form action="" className='update-form' onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2} className='mui-grid-admin '>
                            <Grid item lg={6} className='mui-item-grid-admin d-flex justify-content-center'>
                                <div>
                                    <h5>Ngày đến cũ: <span style={{ fontWeight: "400" }}>{bookRoom.ngayDen}</span></h5>
                                    <h5>Ngày Đi cũ: <span style={{ fontWeight: "400" }}>{bookRoom.ngayDi}</span></h5>

                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={item => {
                                            setPhoneDate([item.selection])
                                        }}
                                        moveRangeOnFirstSelection={false}
                                        ranges={phoneDate}
                                    />
                                    {phoneError !== "" ? <FormHelperText id="my-helper-text">{phoneError}</FormHelperText> : <></>}
                                </div>
                            </Grid>
                            <Grid item lg={6} className='mui-item-grid-admin'>
                                <FormControl variant='standard' className='mui-form-control' margin='dense' error={formik.errors.soLuongKhach ? true : false}>
                                    <InputLabel htmlFor="my-input-phone" sx={{ fontSize: "1.5rem" }}>Số Lượng khách</InputLabel>
                                    <Input id="my-input-phone" aria-describedby="my-helper-text" {...formik.getFieldProps('soLuongKhach')} sx={{ fontSize: "1.5rem" }} />
                                    {formik.touched.soLuongKhach && formik.errors.soLuongKhach ? <FormHelperText id="my-helper-text">{`${formik.errors.soLuongKhach}`}</FormHelperText> : <></>}
                                </FormControl>
                            </Grid>
                        </Grid>

                        <div className="button-group-admin-register">
                            <Button variant="contained" onClick={handleCheckAvailable}>Kiểm tra lịch</Button>
                            <Button variant="contained" type='submit'>Sửa</Button>
                            <Button variant="contained" onClick={handleClose}>Hủy</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}