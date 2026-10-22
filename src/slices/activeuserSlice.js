import { createSlice } from '@reduxjs/toolkit'

export const activeuserSlice = createSlice({
    name: "active",
    initialState: {
        value: null
    },
    reducers: {
       activeuserinfo:(state,action) => {
            
            state.value=action.payload
           
            
        },
      

    }
})
export const { activeuserinfo } = activeuserSlice.actions
export default activeuserSlice.reducer