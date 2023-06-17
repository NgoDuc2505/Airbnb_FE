import React, { Suspense }  from 'react'
import { Outlet } from 'react-router-dom'
import './registerTemplate.scss'
function RegisterTemplate() {
  return (
    <div className='register-template'>
      <div className="left-content">
        <img src="https://source.unsplash.com/random?wallpapers" alt="..." />
      </div>
      <div className="right-content">
        <Suspense fallback={<><h1>Loading...</h1></>}>
          <Outlet/>
        </Suspense>
      </div>
    </div>
  )
}

export default RegisterTemplate