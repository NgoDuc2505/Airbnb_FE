import React, { Suspense }  from 'react'
import { Outlet } from 'react-router-dom'
import HeaderHome from '../../Components/Header-home/HeaderHome'
import FooterHome from '../../Components/Footer-home/FooterHome'
import { SkeletonDetail } from '../../Components/Skeleton/Skeleton'

function DetailTemplate() {
  return (
    <div>
      <HeaderHome/>
      <Suspense fallback={<SkeletonDetail/>}>
        <Outlet />
      </Suspense>
      <FooterHome/>
    </div>
  )
}

export default DetailTemplate