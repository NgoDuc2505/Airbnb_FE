//react
import { Suspense }  from 'react'
import { Outlet } from 'react-router-dom'
//css
import './registerTemplate.scss'
//components
import { SkeletonRegister } from '../../Components/Skeleton/Skeleton'
import { useScrollTop } from '../../hooks/useScrollTop'


function RegisterTemplate() {
  useScrollTop()
  return (
    <div className='register-template'>
      <div className="left-content">
        <img src="https://picsum.photos/1200/900" alt="..." />
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