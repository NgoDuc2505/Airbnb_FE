
import { Fragment, lazy } from 'react'
import HomeTemplate from './Template/Home-template/HomeTemplate'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminTemplate from './Template/Admin-template/AdminTemplate'
import DetailTemplate from './Template/Detail-template/DetailTemplate'
import RegisterTemplate from './Template/Register-template/RegisterTemplate'

const HomePage = lazy(()=>{return import('./Pages/Home-page/HomePage') })
const RoomList = lazy(()=>{return import('./Pages/Room-list/RoomList')})


function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<HomeTemplate/>}>
            <Route path='room-list' element={<RoomList/>}></Route>
            <Route path='' element={<HomePage/>}></Route>
          </Route>
          <Route path='detail' element={<DetailTemplate/>}>

          </Route>
          <Route path='auth' element={<RegisterTemplate/>}>

          </Route>
          <Route path='admin' element={<AdminTemplate/>}>

          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App
