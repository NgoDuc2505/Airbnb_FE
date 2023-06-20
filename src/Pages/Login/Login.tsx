import React from 'react'
import './login.scss'
//formik 
import { useFormik } from 'formik';
import * as Yup from 'yup';
//const
import { regex, IValuesLogin } from '../../constant/constant'
import Button from '@mui/material/Button';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import { NavLink } from 'react-router-dom';
function Login() {
  const formik = useFormik({
    initialValues: {
      user:'',
      password:'',
    },
    validationSchema:Yup.object().shape({
      user: Yup.string().min(6, 'Min is 6 characters').max(12, 'Max is 12 characters').required('User can not be empty'),
      password: Yup.string().required('Password can not be empty').min(6, 'Min is 6 characters').max(12, 'Max is 12 characters').matches(regex.password, 'password must contain at least 1 digit, 1 special character, 1 alphabeltic character !'),
    }),
    onSubmit:(values: IValuesLogin) => {
      console.log(values);
    }
  })
  return (
    <div className='login-page'>
      <div className="login-page-title">
        <i className="fa-solid fa-user-lock"></i>
        <h1>Đăng nhập</h1>
      </div>
      <form action="" className='login-form'>
      <FormControl variant='standard' className='mui-form-control' margin='dense' error={formik.errors.user ? true : false}>
          <InputLabel htmlFor="my-input-account">Tài khoản</InputLabel>
          <Input id="my-input-account" aria-describedby="my-helper-text" {...formik.getFieldProps('user')} />
          {formik.touched.user && formik.errors.user ? <FormHelperText id="my-helper-text">{formik.errors.user}</FormHelperText> : <></>}
        </FormControl>
        <FormControl variant='standard' className='mui-form-control' margin='dense' error={formik.errors.password ? true : false}>
          <InputLabel htmlFor="my-input-password">Mật khẩu</InputLabel>
          <Input id="my-input-password" aria-describedby="my-helper-text" {...formik.getFieldProps('password')}/>
          {formik.touched.password && formik.errors.password ? <FormHelperText id="my-helper-text">{formik.errors.password}</FormHelperText> : <></>}
        </FormControl>
        <div className="form-button-group">
          <Button variant="outlined" type='submit'>Đăng nhập</Button>
          <Button variant="outlined" className='register-navigate-button'>
            <NavLink to={'/auth/register'}>Đăng ký</NavLink>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login