import { useEffect } from 'react'
import { getLocal } from '../../utils/utils'
import { ACCESS_USER_ID } from '../../constant/constant'
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData } from '../../redux/user-slice/UserSlice'
import { AppDispatch, RootState } from '../../redux/store'
function PersonalInformation() {
  const dispatch = useDispatch<AppDispatch>()
  const tokenId: number =getLocal(ACCESS_USER_ID);
  useEffect(()=>{
    dispatch(getProfileData(tokenId))
  },[tokenId])
  const profileData = useSelector((state: RootState)=>state.sliceUser.profileData)
  console.log(profileData)
  return (
    <div className='profile'>
    
    </div>
  )
}

export default PersonalInformation