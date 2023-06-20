import React, { Suspense }  from 'react'
import { Outlet } from 'react-router-dom'
import './registerTemplate.scss'
import { SkeletonRegister } from '../../Components/Skeleton/Skeleton'
function RegisterTemplate() {
  return (
    <div className='register-template'>
      <div className="left-content">
        <img src="https://source.unsplash.com/random?wallpapers" alt="..." />
      </div>
      <div className="right-content">
        <Suspense fallback={<SkeletonRegister/>}>
          <Outlet/>
        </Suspense>
      </div>
    </div>
  )
}

export default RegisterTemplate