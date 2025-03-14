import { configureStore } from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import feedReducer from './feedSlice'
import requestReducer from './requestSlice'

const store= configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    request: requestReducer,
  },
})

export default  store