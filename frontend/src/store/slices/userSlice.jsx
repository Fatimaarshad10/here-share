import { createSlice } from "@reduxjs/toolkit";
import { deleteAlluser } from "../action";
const userSlice = createSlice({
  name: "user",
  initialState:[],
  reducers: {
    adduser(state, action) {
      state.push(action.payload)
    },
    removeuser(state, action) {
      const data  = state.filter(item => item.id !== action.payload)
      state.pop(data)
    },
    // deleteAlluser(state , action) {
    //   return state = [ ]
    
    // },
  },

    extraReducers(builder){
      builder.addCase(deleteAlluser , ()=>{
        return  []
      })
    }
});
console.log(userSlice.actions)
export const { adduser , removeuser } = userSlice.actions;
export default userSlice.reducer
