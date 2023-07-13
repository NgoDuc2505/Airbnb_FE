import HeaderHome from "../../Components/Header-home/HeaderHome"
import {Suspense, useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import FooterHome from "../../Components/Footer-home/FooterHome"
import {SkeletonC, SkeletonListRoom} from "../../Components/Skeleton/Skeleton"

function HomeTemplate() {
  const location = useLocation()
  return (
    <div>
        <HeaderHome/>
        <Suspense fallback={location.pathname === '/' ? <SkeletonC/> : <SkeletonListRoom/>}>
            <Outlet />
        </Suspense>
        <FooterHome/>
    </div>
  )
}

export default HomeTemplate