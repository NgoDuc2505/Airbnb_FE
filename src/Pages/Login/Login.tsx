import React from 'react'
import './login.scss'

import Button from '@mui/material/Button';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import { NavLink } from 'react-router-dom';
function Login() {
  return (
    <div className='login-page'>
      <div className="login-page-title">
        <i className="fa-solid fa-user-lock"></i>
        <h1>Đăng nhập</h1>
      </div>
      <form action="" className='login-form'>
        <FormControl variant='standard' className='mui-form-control' margin='normal' error={false}>
          <InputLabel htmlFor="my-input-account">Tài khoản</InputLabel>
          <Input id="my-input-account" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your Tài khoản.</FormHelperText>
        </FormControl>
        <FormControl variant='standard' className='mui-form-control' margin='normal' error={false}>
          <InputLabel htmlFor="my-input-password">Mật khẩu</InputLabel>
          <Input id="my-input-password" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">We'll never share your Mật khẩu.</FormHelperText>
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