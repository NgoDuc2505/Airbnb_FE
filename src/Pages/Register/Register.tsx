//react
import { NavLink, useNavigate } from 'react-router-dom';
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
import '../Login/login.scss'
//formik 
import { useFormik } from 'formik';
import * as Yup from 'yup';
//const
import { regex, IValues } from '../../constant/constant'
//swal
import swal from 'sweetalert';
//services
import { axiosInterceptorWithCybertoken } from '../../services/services'

function Register() {
  const navigate = useNavigate()
  const [isValid, setValid] = useState(true)
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [genderValue, setGender] = useState<boolean | string>();
  const [open, setOpen] = useState(false);
  const handleChange = (event: SelectChangeEvent<typeof genderValue>) => {
    setGender(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const formik = useFormik({
    initialValues: {
      user: '',
      password: '',
      checkPassword: '',
      name: '',
      email: '',
      phone: '',
      birthday: '',
      role: '',
      gender: true,
    },
    validationSchema: Yup.object().shape({
      user: Yup.string().min(6, 'Min is 6 characters').max(12, 'Max is 12 characters').required('User can not be empty'),
      password: Yup.string().required('Password can not be empty').min(6, 'Min is 6 characters').max(12, 'Max is 12 characters').matches(regex.password, 'password must contain at least 1 digit, 1 special character, 1 alphabeltic character !'),
      checkPassword: Yup.string().required('Please confirm your password').oneOf([Yup.ref('password')], 'Passwords must match!'),
      name: Yup.string().matches(regex.nameByVietnamese, 'Name has to be valid').required('Name can not be empty'),
      email: Yup.string().email('This field has to be email').required('Email can not be empty'),
      phone: Yup.number().required('Phone can not be empty')
    }),
    onSubmit: async (values: IValues) => {
      try {
        const date = `${dateValue?.date()}-${(dateValue?.month() || 0) + 1}-${dateValue?.year()}`
        const getGender = (genderValue === 'true' ? true : (genderValue === 'false' ? false : ""))

        if (date === "undefined-1-undefined" || (getGender === "")) {
          setValid(false)
        } else {
          setValid(true)
          const newValue = {
            ...values,
            birthday: date,
            role: 'USER',
            gender: getGender,
          }
          await axiosInterceptorWithCybertoken.post('/api/auth/signup', newValue)
          swal("Thành công, tài khoản đã được tạo!", {
            icon: "success",
          });
          navigate('/auth/login')
        }
      } catch (error) {
        console.log(error)
        swal("Thất bại, email đã được dùng!", {
          icon: "error",
        });
      }

    }
  })

  return (
    <div className='register-page'>
      {!isValid ? <Alert className='mui-alert' severity="error" sx={{ fontSize: '2rem' }}>Vui lòng điền đầy đủ thông tin!</Alert> : <></>}
      <div className="login-page-title">
        <i className="fa-solid fa-fingerprint"></i>
        <h1>Đăng ký</h1>
      </div>
      <form action="" className='login-form' onSubmit={formik.handleSubmit}>
        <FormControl variant='standard' className='mui-form-control' margin='dense' error={formik.errors.user ? true : false}>
          <InputLabel htmlFor="my-input-account">Tài khoản</InputLabel>
          <Input id="my-input-account" aria-describedby="my-helper-text" {...formik.getFieldProps('user')} />
          {formik.touched.user && formik.errors.user ? <FormHelperText id="my-helper-text">{formik.errors.user}</FormHelperText> : <></>}
        </FormControl>
        <FormControl variant='standard' className='mui-form-control' margin='dense' error={formik.errors.password ? true : false}>
          <InputLabel htmlFor="my-input-password">Mật khẩu</InputLabel>
          <Input id="my-input-password" aria-describedby="my-helper-text" {...formik.getFieldProps('password')} />
          {formik.touched.password && formik.errors.password ? <FormHelperText id="my-helper-text">{formik.errors.password}</FormHelperText> : <></>}
        </FormControl>
        <FormControl variant='standard' className='mui-form-control' margin='dense' error={formik.errors.checkPassword ? true : false}>
          <InputLabel htmlFor="my-input-password-check">Nhập lại mật khẩu</InputLabel>
          <Input id="my-input-password-check" aria-describedby="my-helper-text" {...formik.getFieldProps('checkPassword')} />
          {formik.touched.checkPassword && formik.errors.checkPassword ? <FormHelperText id="my-helper-text">{formik.errors.checkPassword}</FormHelperText> : <></>}
        </FormControl>
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
        <Box sx={{ display: 'flex' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker className='date-pick' value={dateValue} onChange={(newValue) => setDateValue(newValue)} />
            </DemoContainer>
          </LocalizationProvider>
          <FormControl sx={{ m: 1, minWidth: 90 }}>
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
              sx={{ fontSize: '1.4rem' }}
            >
              <MenuItem value={'true'}>Male</MenuItem>
              <MenuItem value={'false'}>Female</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <div className="form-button-group">
          <Button variant="outlined" type='submit'>Đăng ký</Button>
          <Button variant="outlined" className='register-navigate-button'>
            <NavLink to={'/auth/login'}>Đăng nhập</NavLink>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Register