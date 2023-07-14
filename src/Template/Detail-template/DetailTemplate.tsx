//react
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
//components
import HeaderHome from '../../Components/Header-home/HeaderHome'
import FooterHome from '../../Components/Footer-home/FooterHome'
import { SkeletonProfile } from '../../Components/Skeleton/Skeleton'
import { useScrollTop } from '../../hooks/useScrollTop'

function DetailTemplate() {
  useScrollTop()
  return (
    <div className='detail-template'>
      <HeaderHome/>
      <Suspense fallback={<SkeletonProfile/>}>
        <Outlet></Outlet>
      </Suspense>
      <FooterHome/>
    </div>
  )
}

export default DetailTemplate