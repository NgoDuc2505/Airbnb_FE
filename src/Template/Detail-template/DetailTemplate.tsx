import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import PersonalInformation from '../../Pages/Personal-information/PersonalInformation'

function DetailTemplate() {
  return (
    <div className='detail-template'>
      <Suspense fallback={<><h1>loading...</h1></>}>
        <Outlet></Outlet>
      </Suspense>
    </div>
  )
}

export default DetailTemplate