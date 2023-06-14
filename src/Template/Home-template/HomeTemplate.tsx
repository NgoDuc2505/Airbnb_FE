import HeaderHome from "../../Components/Header-home/HeaderHome"
import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import FooterHome from "../../Components/Footer-home/FooterHome"
function HomeTemplate() {
  return (
    <div>
        <HeaderHome/>
        <Suspense fallback={<><h1>loading...</h1></>}>
            <Outlet/>
        </Suspense>
        <FooterHome/>
    </div>
  )
}

export default HomeTemplate