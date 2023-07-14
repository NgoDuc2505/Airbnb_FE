//react
import { Fragment, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//template
import HomeTemplate from './Template/Home-template/HomeTemplate'
import AdminTemplate from './Template/Admin-template/AdminTemplate'
import DetailTemplate from './Template/Detail-template/DetailTemplate'
import RegisterTemplate from './Template/Register-template/RegisterTemplate'
import RoomTemplate from './Template/Room-template/RoomTemplate'

const HomePage = lazy(() => { return import('./Pages/Home-page/HomePage') })
const RoomList = lazy(() => { return import('./Pages/Room-list/RoomList') })
const Login = lazy(() => { return import('./Pages/Login/Login') })
const Register = lazy(()=>{return import('./Pages/Register/Register')})
const Detail = lazy(()=>{return import('./Pages/Detail-room/DetailRoom')})
const PersonalInformation = lazy(()=>{return import('./Pages/Personal-information/PersonalInformation')})
const ManageUser = lazy(()=> {return import('./Components/Admin/ManageUser')})
const ManageRoom = lazy(()=>{return import('./Components/Admin/ManageRoom')})
const ManageBookedRoom = lazy(()=>{return import('./Components/Admin/ManageBookedRoom')})
const ManageLocation = lazy(()=>{return import('./Components/Admin/ManageLocation')})

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<HomeTemplate />}>
            <Route path=':idLocation' element={<RoomList />}></Route>
            <Route path='' element={<HomePage />}></Route>
          </Route>
          <Route path='Detail' element={<DetailTemplate />}>
            <Route path='profile' element={<PersonalInformation/>}></Route>
          </Route>
          <Route path='room' element={<RoomTemplate />}>
            <Route path=':idDetail' element={<Detail />}></Route>
          </Route>
          <Route path='auth' element={<RegisterTemplate />}>
            <Route path='login' element={<Login/>}></Route>
            <Route path='register' element={<Register/>}></Route>
          </Route>
          <Route path='@@admin' element={<AdminTemplate />}>
            <Route path='user' element={<ManageUser/>}></Route>
            <Route path='roomdetail' element={<ManageRoom/>}></Route>
            <Route path='booked' element={<ManageBookedRoom/>}></Route>
            <Route path='location' element={<ManageLocation/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
