import { createSlice } from "@reduxjs/toolkit"


const requestSlice = createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addrequests:(state,action)=>{
            state=action.payload
            return state

        },
        removerequests:(state,action)=>{
            const newState=state.filter((item)=>item._id !== action.payload)
            return newState
        }
    }
})

export const {addrequests,removerequests}=requestSlice.actions

export default requestSlice.reducer