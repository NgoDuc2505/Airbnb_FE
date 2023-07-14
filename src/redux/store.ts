import { configureStore } from '@reduxjs/toolkit'
import sliceLocation from './Location-slice/LocationSlice'
import sliceUser from './user-slice/UserSlice'
import sliceRoomDetail from './Detail-slice/DetailSlice'
import sliceComment from './Comment-slice/CommentSlice'
import sliceCurrent from './Current-detail/currentDetailManage'
import sliceUserAdmin from './Admin-slice/AdminUserSlice'
import sliceRoomAdmin from './Admin-slice/AdminRoomSlice'
import sliceBookingAdmin from './Admin-slice/AdminBookingSlice'
import sliceLocationAdmin from './Admin-slice/AdminLocationSlice'
export const store = configureStore({
  reducer: {
    sliceLocation,
    sliceUser,
    sliceRoomDetail,
    sliceComment,
    sliceCurrent,
    sliceUserAdmin,
    sliceRoomAdmin,
    sliceLocationAdmin,
    sliceBookingAdmin
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch