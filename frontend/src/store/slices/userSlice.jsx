import { createSlice } from "@reduxjs/toolkit";
import { deleteAlluser } from "../action";
const userSlice = createSlice({
  name: "user",
  initialState:{
    isLoggedIn: false,
    users : []
  },
  reducers: {
    adduser(state, action) {

      state.users.push(action.payload)
      state.isLoggedIn = true;
    },
    removeuser(state, action) {
      const data  = state.filter(item => item.id !== action.payload)
      state.users.pop(data)
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
