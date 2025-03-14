import { createSlice } from "@reduxjs/toolkit"


const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        feedpage: [],
        status: 'idle',
        error: null
    },
    reducers:{
    addfeed: (state, action) => {
        state.feedpage = action.payload
        state.status = 'success'
    },
    removeUserFromFeed: (state, action) => {
        state.feedpage = state.feedpage.filter((item) => item._id !== action.payload)
    },
    }
})
export const {addfeed,removeUserFromFeed}=feedSlice.actions

export default feedSlice.reducer
