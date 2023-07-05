import { useState } from 'react'
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
import { IProfile, IValueUpdate, regex } from '../../constant/constant';
import { axiosInterceptorWithCybertoken } from '../../services/services';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { updateUserList } from '../../redux/Admin-slice/AdminUserSlice';

interface IProps{
    personData: IProfile,
    handleCloseModal:()=>void
}

function PersonUpdateModal({handleCloseModal, personData}:IProps) {

    const [open, setOpen] = useState(false);
    const [dateValue, setDateValue] = useState<Dayjs | null>(null);
    const [genderValue, setGender] = useState<boolean | string>();
    const dispatch = useDispatch<AppDispatch>()
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange = (event: SelectChangeEvent<typeof genderValue>) => {
        setGender(event.target.value);
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            birthday: "",
            role: "",
            gender: true,
        },
        validationSchema: Yup.object().shape({
          role: Yup.string().required('Role can not be empty').notOneOf(["admin", "user"], "Please capitalise the role").oneOf(["ADMIN", "USER"], "Invalid Role"),
          name: Yup.string().matches(regex.nameByVietnamese, 'Name has to be valid').required('Name can not be empty'),
          phone: Yup.number().required('Phone can not be empty')
        }),
        onSubmit: async (values: IValueUpdate) => {
            console.log("Fsfasdas","Dsadsadasdasdasdd")
        
          try {
            const date = `${dateValue?.date()}-${(dateValue?.month() || 0) + 1}-${dateValue?.year()}`
            const getGender = (genderValue === 'true' ? true : (genderValue === 'false' ? false : ""))

            const newValue = {
            ...values,
            email: personData.email,
            birthday: date,
            gender: getGender,
            }

            await axiosInterceptorWithCybertoken.put(`/api/users/${personData.id}`, newValue)
            dispatch(updateUserList({...newValue, id: personData.id}))
            swal("Thành công, tài khoản đã được update!", {
            icon: "success",
            });


          } catch (error) {
            console.log(error)
            swal("Thất bại, email đã được dùng!", {
              icon: "error",
            });
          }
    
        }
      })



  return (
    <div className='person-update-modal'>
          <form action="" className='person-update-form' onSubmit={formik.handleSubmit}>
                <h1>Cập nhật thông tin</h1>
                <Grid container spacing={2} className='mui-grid-admin'>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.name ? true : false}>
                        <InputLabel htmlFor="name">Họ tên</InputLabel>
                        <Input id="name" aria-describedby="my-helper-text" {...formik.getFieldProps('name')}/>
                        {formik.touched.name && formik.errors.name ? <FormHelperText id="my-helper-text">{formik.errors.name}</FormHelperText> : <></>}
                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense'>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input id="email" aria-describedby="my-helper-text" disabled={true} value={personData.email}/>

                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense'  error={formik.errors.phone ? true : false}>
                        <InputLabel htmlFor="phone">Số điện thoại</InputLabel>
                        <Input id="phone" aria-describedby="my-helper-text" {...formik.getFieldProps('phone')} />
                        {formik.touched.phone && formik.errors.phone ? <FormHelperText id="my-helper-text">{formik.errors.phone}</FormHelperText> : <></>}

                    </FormControl>
                    </Grid>
                    <Grid item lg={6} className='mui-item-grid-admin'>
                    <FormControl variant='standard' className='mui-form-control-admin' margin='dense' error={formik.errors.role ? true : false}>
                        <InputLabel htmlFor="role">Quyền</InputLabel>
                        <Input id="role" aria-describedby="my-helper-text" {...formik.getFieldProps('role')} />
                        {formik.touched.role && formik.errors.role ? <FormHelperText id="my-helper-text">{formik.errors.role}</FormHelperText> : <></>}

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
                    </Grid>
                </Grid>
                <div className="button-group-admin-register">
                    <Button variant="contained" type='submit'>Sửa</Button>
                    <Button variant="contained" onClick={handleCloseModal}>Hủy</Button>
                </div>
            </form>
    </div>
  )
}

export default PersonUpdateModal