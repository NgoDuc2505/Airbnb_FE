import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import PersonalInformation from '../../Pages/Personal-information/PersonalInformation'
import HeaderHome from '../../Components/Header-home/HeaderHome'
import FooterHome from '../../Components/Footer-home/FooterHome'

function DetailTemplate() {
  return (
    <div className='detail-template'>
      <HeaderHome/>
      <Suspense fallback={<><h1>loading...</h1></>}>
        <Outlet></Outlet>
      </Suspense>
      <FooterHome/>
    </div>
  )
}

export default DetailTemplate