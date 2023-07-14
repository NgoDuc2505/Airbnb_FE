
import { NavLink, useNavigate } from 'react-router-dom';
import './login.scss'
//formik 
import { useFormik } from 'formik';
import * as Yup from 'yup';
//const
import { regex, IValuesLogin, ACCESS_TOKEN, ACCESS_USER_ID } from '../../constant/constant'
import Button from '@mui/material/Button';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
//utils
import { setLocal } from '../../utils/utils'
//swal
import swal from 'sweetalert';
//services
import { axiosInterceptorWithCybertoken } from '../../services/services'

function Login() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email:'',
      password:'',
    },
    validationSchema:Yup.object().shape({
      email: Yup.string().email('This field has to be email').required('Email can not be empty'),
      password: Yup.string().required('Password can not be empty').min(6, 'Min is 6 characters').max(12, 'Max is 12 characters').matches(regex.password, 'password must contain at least 1 digit, 1 special character, 1 alphabeltic character !'),
    }),
    onSubmit: async (values: IValuesLogin) => {
      try{
        const resp = await axiosInterceptorWithCybertoken.post('/api/auth/signin',values)
        setLocal(ACCESS_TOKEN,resp.data.content.token)
        setLocal(ACCESS_USER_ID,resp.data.content.user.id)
        swal("Đã đăng nhập thành công!", {icon: "success"})
        navigate('/detail/profile')
      }catch(error){
        console.log(error)
        swal("Đăng nhập thất bại!", {icon: "error"})
      }
    }
  })
  return (
    <div className='login-page'>
      <div className="login-page-title">
        <i className="fa-solid fa-user-lock"></i>
        <h1>Đăng nhập</h1>
      </div>
      <form action="" className='login-form' onSubmit={formik.handleSubmit}>
      <FormControl variant='standard' className='mui-form-control' margin='dense' error={formik.errors.email ? true : false}>
          <InputLabel htmlFor="my-input-email">Email</InputLabel>
          <Input id="my-input-email" aria-describedby="my-helper-text" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email ? <FormHelperText id="my-helper-text">{formik.errors.email}</FormHelperText> : <></>}
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