import { useEffect } from 'react'
import { getLocal } from '../../utils/utils'
import { ACCESS_USER_ID } from '../../constant/constant'
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData } from '../../redux/user-slice/UserSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { getRoomByUserId } from '../../redux/Detail-slice/DetailSlice';

import { Container } from '@mui/material'
import { Profile } from '../../Components/Profile/Profile';


function PersonalInformation() {
  const dispatch = useDispatch<AppDispatch>()
  const tokenId: number = getLocal(ACCESS_USER_ID);
  useEffect(()=>{
    dispatch(getProfileData(tokenId))
    dispatch(getRoomByUserId(tokenId))
  },[tokenId])

  const profileData = useSelector((state: RootState)=>state.sliceUser.profileData)
  const bookRoomData = useSelector((state: RootState)=>state.sliceRoomDetail.currentBookRoom)
  return (
    <div> 
      <Container maxWidth='lg'>
        <Profile profileData={profileData} bookRoomData={bookRoomData}/> 
      </Container>
    </div>
  )
}

export default PersonalInformation