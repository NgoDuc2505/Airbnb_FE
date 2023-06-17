import React from 'react'
import { NavLink } from 'react-router-dom';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import '../Login/login.scss'
function Register() {
  return (
    <div className='register-page'>
      <div className="login-page-title">
        <i className="fa-solid fa-user-lock"></i>
        <h1>Đăng ký</h1>
      </div>
      <form action="" className='login-form'>
        <FormControl variant='standard' className='mui-form-control' margin='dense' error={false}>
          <InputLabel htmlFor="my-input-account">Tài khoản</InputLabel>
          <Input id="my-input-account" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your Tài khoản.</FormHelperText>
        </FormControl>
        <FormControl variant='standard' className='mui-form-control' margin='dense' error={false}>
          <InputLabel htmlFor="my-input-password">Mật khẩu</InputLabel>
          <Input id="my-input-password" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your Mật khẩu.</FormHelperText>
        </FormControl>
        <FormControl variant='standard' className='mui-form-control' margin='dense' error={false}>
          <InputLabel htmlFor="my-input-password-check">Nhập lại mật khẩu</InputLabel>
          <Input id="my-input-password-check" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your Mật khẩu.</FormHelperText>
        </FormControl>
        <FormControl variant='standard' className='mui-form-control' margin='dense' error={false}>
          <InputLabel htmlFor="my-input-name">Họ tên</InputLabel>
          <Input id="my-input-name" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your Họ tên.</FormHelperText>
        </FormControl>
        <FormControl variant='standard' className='mui-form-control' margin='dense' error={false}>
          <InputLabel htmlFor="my-input-email">Email</InputLabel>
          <Input id="my-input-email" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your Email.</FormHelperText>
        </FormControl>
        <FormControl variant='standard' className='mui-form-control' margin='dense' error={false}>
          <InputLabel htmlFor="my-input-phone">Số điện thoại</InputLabel>
          <Input id="my-input-phone" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your Số điện thoại.</FormHelperText>
        </FormControl>
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