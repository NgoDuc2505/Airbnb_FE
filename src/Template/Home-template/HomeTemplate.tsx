import HeaderHome from "../../Components/Header-home/HeaderHome"
import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import FooterHome from "../../Components/Footer-home/FooterHome"
import SkeletonC from "../../Components/Skeleton/Skeleton"

function HomeTemplate() {
  
  return (
    <div>
        <HeaderHome/>
        <Suspense fallback={<SkeletonC/>}>
            <Outlet />
        </Suspense>
        <FooterHome/>
    </div>
  )
}

export default HomeTemplate