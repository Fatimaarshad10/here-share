import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
const initialState = {
  admin :"",
  email:"",
  error :'error'
}
export const  register = createAsyncThunk( 'SignUp',
  async (body) => {
    
      const response = await fetch(
        'http://localhost:4000/user/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );
      return await response.json();
     

      
  
  }
);
export const login = createAsyncThunk('login', async(body)=>{
  const res = await fetch('http://localhost:4000/user/login',{
    method:"POST",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        withCredentials:true , 
      },
    body: JSON.stringify(body)
  })
  return await res.json();
 
})
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser:(state, action)=>{
      state.email =  localStorage.getItem("data")
    },
   logOut:(state , action)=>{
    localStorage.clear('data')
   }
  },
  extraReducers:{
    
    [login.fulfilled]: (state, { payload: { email  , admin , error} }) => {
      
      if (error) {
        console.log(error)
      } else {
      
        state.email = email
        state.admin = admin
        console.log({ email , admin });
        localStorage.setItem('data', JSON.stringify(email))
      }
    },
    
    // register
    
    [register.fulfilled]: (state,{payload:{email  , error }})=>{
      if(error){
        console.log(error)
      }else{
        state.email = email 
      }
    }
  }
});
export const {addUser , logOut } = authSlice.reducer
export default authSlice.reducer
