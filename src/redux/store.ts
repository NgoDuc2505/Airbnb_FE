import { configureStore } from '@reduxjs/toolkit'
import sliceLocation from './Location-slice/LocationSlice'
import sliceDetail from './Detail-slice/DetailSlice'
import sliceComment from './Comment-slice/CommentSlice'

export const store = configureStore({
  reducer: {
    sliceLocation,
    sliceDetail,
    sliceComment
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch