import { useEffect, useState } from 'react'
import { Box, FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import './adminRegister.scss'
import Button from '@mui/material/Button';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosInterceptorWithCybertoken } from '../../services/services';
import { IValues, regex } from '../../constant/constant';
import swal from 'sweetalert';


interface IProps {
    handleCloseModal: () => void
}

function AdminRegister({ handleCloseModal }: IProps) {
    const [open, setOpen] = useState(false);
    const [dateValue, setDateValue] = useState<Dayjs | null>(null);
    const [genderValue, setGender] = useState<boolean | string>();
    const [isValid, setValid] = useState<boolean>()

    let dateGenerate = `${dateValue?.date()}-${(dateValue?.month() || 0) + 1}-${dateValue?.year()}`
    let getGender = (genderValue === 'true' ? true : (genderValue === 'false' ? false : ""))

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange = (event: SelectChangeEvent<typeof genderValue>) => {
        setGender(event.target.value);
    };

    useEffect(() => { 
        dateGenerate = `${dateValue?.date()}-${(dateValue?.month() || 0) + 1}-${dateValue?.year()}`
        getGender = (genderValue === 'true' ? true : (genderValue === 'false' ? false : ""))
        if (dateGenerate === "undefined-1-undefined" || (getGender === "")) {
            setValid(false)
        } else {
            setValid(true)
        }
    }, [dateGenerate, genderValue])



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
                 
                if(isValid){
                    const newValue = {
                        ...values,
                        birthday: dateGenerate,
                        role: 'ADMIN',
                        gender: getGender,
                    }

                    await axiosInterceptorWithCybertoken.post('/api/users', newValue)
                    handleCloseModal()

                    swal("Thành công, tài khoản đã được tạo!", {
                        icon: "success",
                    });
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
        <div className='admin-register'>
            <form action="" className='admin-register-form' onSubmit={formik.handleSubmit}>
                <h1>Đăng ký người quản trị</h1>
                <Grid container spacing={2} className='mui-grid-admin'>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.user ? true : false}>
                        <InputLabel htmlFor="my-input-account">Tài khoản</InputLabel>
                        <Input id="my-input-account" aria-describedby="my-helper-text" {...formik.getFieldProps('user')} />
                        {formik.touched.user && formik.errors.user ? <FormHelperText id="my-helper-text">{formik.errors.user}</FormHelperText> : <></>}
                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.password ? true : false}>
                        <InputLabel htmlFor="my-input-password">Mật khẩu</InputLabel>
                        <Input id="my-input-password" aria-describedby="my-helper-text" {...formik.getFieldProps('password')} />
                        {formik.touched.password && formik.errors.password ? <FormHelperText id="my-helper-text">{formik.errors.password}</FormHelperText> : <></>}
                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.checkPassword ? true : false}>
                        <InputLabel htmlFor="my-input-password-check">Nhập lại mật khẩu</InputLabel>
                        <Input id="my-input-password-check" aria-describedby="my-helper-text" {...formik.getFieldProps('checkPassword')} />
                        {formik.touched.checkPassword && formik.errors.checkPassword ? <FormHelperText id="my-helper-text">{formik.errors.checkPassword}</FormHelperText> : <></>}
                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.name ? true : false}>
                        <InputLabel htmlFor="my-input-name">Họ tên</InputLabel>
                        <Input id="my-input-name" aria-describedby="my-helper-text" {...formik.getFieldProps('name')} />
                        {formik.touched.name && formik.errors.name ? <FormHelperText id="my-helper-text">{formik.errors.name}</FormHelperText> : <></>}
                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.email ? true : false}>
                        <InputLabel htmlFor="my-input-email">Email</InputLabel>
                        <Input id="my-input-email" aria-describedby="my-helper-text" {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email ? <FormHelperText id="my-helper-text">{formik.errors.email}</FormHelperText> : <></>}
                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.phone ? true : false}>
                        <InputLabel htmlFor="my-input-phone">Số điện thoại</InputLabel>
                        <Input id="my-input-phone" aria-describedby="my-helper-text" {...formik.getFieldProps('phone')} />
                        {formik.touched.phone && formik.errors.phone ? <FormHelperText id="my-helper-text">{formik.errors.phone}</FormHelperText> : <></>}
                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
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
                    {!isValid ? <FormHelperText id="my-helper-text" style={{color:"red", fontSize: "1.5rem"}}>Bạn chưa điền ngày sinh hoặc giới tính</FormHelperText> : <></>}
                    </Grid>
                </Grid>
                <div className="button-group-admin-register">
                    <Button variant="contained" type='submit'>Thêm</Button>
                    <Button variant="contained" onClick={() => { handleCloseModal() }}>Hủy</Button>
                </div>
            </form>
        </div>
    )
}

export default AdminRegister