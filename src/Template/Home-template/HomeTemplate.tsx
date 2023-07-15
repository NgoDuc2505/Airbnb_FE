//react
import {Suspense} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
//components
import HeaderHome from "../../Components/Header-home/HeaderHome"
import FooterHome from "../../Components/Footer-home/FooterHome"
import {SkeletonC, SkeletonListRoom} from "../../Components/Skeleton/Skeleton"
import { useScrollTop } from "../../hooks/useScrollTop"

function HomeTemplate() {
  const location = useLocation()
  useScrollTop()
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