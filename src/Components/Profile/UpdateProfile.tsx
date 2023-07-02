import * as React from 'react';
import Modal from '@mui/material/Modal';
import { ACCESS_USER_ID, IProfile, IValueUpdate } from '../../constant/constant';


//react
import { useState } from 'react';
//Mui ui
import { FormControl, FormHelperText, Input, InputLabel, Box } from '@mui/material';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//mui x date picker
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//formik 
import { useFormik } from 'formik';
import * as Yup from 'yup';
//const
import { regex} from '../../constant/constant'
//swal
import swal from 'sweetalert';
//services
import { axiosInterceptorWithCybertoken } from '../../services/services'
import { getLocal } from '../../utils/utils';


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
    profileData: IProfile | any
}

export default function UpdateProfile({profileData}: IProps) {
  const [isValid,setValid] = useState(true);
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);


  const [genderValue, setGender] = useState<boolean | string>();
  const handleChange = (event: SelectChangeEvent<typeof genderValue>) => setGender(event.target.value);


  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      birthday:'',
      role: '',
      gender: true,
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().matches(regex.nameByVietnamese, 'Name has to be valid').required('Name can not be empty'),
      email: Yup.string().email('This field has to be email').required('Email can not be empty'),
      phone: Yup.number().required('Phone can not be empty')
    }),
    onSubmit: async (values: IValueUpdate) => {
      try{
        const date = `${dateValue?.date()}-${(dateValue?.month() || 0 )+1}-${dateValue?.year()}`
        const getGender = (genderValue ==='true' ? true : (genderValue ==='false' ? false : ""))
       
        if(date === "undefined-1-undefined" || (getGender === "")){
          setValid(false)
        }else{
          setValid(true)
          const newValue = {
            ...values,
            birthday: date,
            role: 'USER',
            gender: getGender,
          }
          const resp = await axiosInterceptorWithCybertoken.put(`/api/users/${getLocal(ACCESS_USER_ID)}`,newValue)
          swal("Thành công, Update thành công!", {
            icon: "success",
          });
          window.location.reload();
        }
      }catch(error){
        console.log(error)
        swal("Thất bại, email đã được dùng!", {
          icon: "error",
        });
      }
     
    }
  })




  return (
    <div className='update-page'>
      <Button className="profile-text-highlight" onClick={handleOpenModal}>Chỉnh sửa hồ sơ</Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="profile-box-modal" sx={style}>
            {!isValid ? <Alert className='mui-alert' severity="error" sx={{fontSize:'2rem'}}>Vui lòng điền đầy đủ thông tin!</Alert> : <></> }
            <div className="login-page-title">
                <h1>Update Profile</h1>
            </div>
            <form action="" className='login-form' onSubmit={formik.handleSubmit}>
                <FormControl variant='standard' className='mui-form-control' margin='dense' error={formik.errors.name ? true : false}>
                    <InputLabel htmlFor="my-input-name">Họ tên</InputLabel>
                    <Input id="my-input-name" aria-describedby="my-helper-text" {...formik.getFieldProps('name')} />
                    {formik.touched.name && formik.errors.name ? <FormHelperText id="my-helper-text">{formik.errors.name}</FormHelperText> : <></>}
                </FormControl>
                <FormControl variant='standard' className='mui-form-control' margin='dense' error={formik.errors.email ? true : false}>
                    <InputLabel htmlFor="my-input-email">Email</InputLabel>
                    <Input id="my-input-email" aria-describedby="my-helper-text" {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email ? <FormHelperText id="my-helper-text">{formik.errors.email}</FormHelperText> : <></>}
                </FormControl>
                <FormControl variant='standard' className='mui-form-control' margin='dense' error={formik.errors.phone ? true : false}>
                    <InputLabel htmlFor="my-input-phone">Số điện thoại</InputLabel>
                    <Input id="my-input-phone" aria-describedby="my-helper-text" {...formik.getFieldProps('phone')} />
                    {formik.touched.phone && formik.errors.phone ? <FormHelperText id="my-helper-text">{formik.errors.phone}</FormHelperText> : <></>}
                </FormControl>
                <Box sx={{display:'flex'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker className='date-pick' value={dateValue} onChange={(newValue) => setDateValue(newValue)}/>
                        </DemoContainer>
                    </LocalizationProvider>
                    <FormControl sx={{ m: 1, minWidth: 90}}>
                        <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
                        <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={genderValue}
                        label="Gender"
                        onChange={handleChange}
                        sx={{fontSize: '1.4rem'}}
                        >
                        <MenuItem value={'true'}>Male</MenuItem>
                        <MenuItem value={'false'}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <div className="form-button-group">
                    <Button variant="outlined" className='register-navigate-button' onClick={() => {setOpenModal(false)}}>Close</Button>
                    <Button variant="outlined" type='submit'>Update</Button>
                </div>
            </form>
        </Box>
      </Modal>
    </div>
  );
}
