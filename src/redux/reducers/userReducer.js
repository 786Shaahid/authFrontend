import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/**1. initialize user*/
const initialState = {
  isMailSend: false,
  emailToken: {},
  error: "",
  message: "",
  accessToken:"",
  refreshToken:"",
  userData:{},
  loading: false,
  users: []
};

// create action
/**1.Sing up */
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (user , { rejectWithValue ,fulfillWithValue}) => {
    try {
      const response = await axios.post("/api/users/signup", user);
      // console.log("response",response.data);
      return fulfillWithValue(response.data); 
    } catch (err) {
      console.log(err.response);
      return rejectWithValue(err.response);
    }
  }
);

/**2. Sign in*/
export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async (user={}, {fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/signin", user);
      return fulfillWithValue(response.data);
    } catch (err) {
      console.log(err.response);
      return rejectWithValue(err.response);
    }
  }
);
/**3. Sign in*/
// a. send email
export const sendMail = createAsyncThunk(
  "auth/sendMail",
  async (data, { rejectWithValue,fulfillWithValue }) => {
    try {
      const response = await axios.post("/api/users/sendmail", data);
      return fulfillWithValue(response);
    } catch (err) {
     return rejectWithValue(err);
    }
  }
);
// b. send otp
export const sendOtpEmail = createAsyncThunk(
  "auth/sendOtp",
  async (data, { rejectWithValue ,fulfillWithValue}) => {
    try {
      const response = await axios.post("/api/users/singinotp", data);
      console.log(response.data);
      return fulfillWithValue(response.data);
    } catch (err) {
     return rejectWithValue(err);
    }
  }
);
/**4. get all users*/
export const getAll = createAsyncThunk("auth/getAll", async (data,{fulfillWithValue,rejectWithValue}) => {
  //  console.log(data);
  try {
    const response = await axios.post("/api/users/getall",{id:data});
    return fulfillWithValue(response.data);
  } catch (err) {
   return rejectWithValue(err);
  }
});

 /**5. Logout User */
  export const logoutUser= createAsyncThunk('auth/logout',async(data,{fulfillWithValue,rejectWithValue})=>{
    console.log(data);
    try {
   const response= await axios.get('/api/users/logout',{
    headers:{
      Authorization: `Bearer ${data}`
   }
    });
    console.log(response);
    fulfillWithValue(response.data);
 } catch (error) {
  rejectWithValue(error);
 }
  })




export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
         updateBtnInSuggestionFriend:(state,action)=>{
          const {user,friendshipID,index}= action.payload;
          const userCopy={...user}
          if(friendshipID){
            userCopy.friendship="";
            state.users[index]=userCopy;
          }else{
            userCopy.friendship={_id:'334534t4554335'} // creating id by default
            state.users[index]=userCopy;
          }
         },
         isEmailSend:(state,action)=>{
          console.log(action.payload);
            state.isMailSend= !action.payload
         },
         toggleError:(state)=>{
            state.error="";  
            state.loading=false; 
         },
         messageNullUserSlice:(state)=>{
              state.message="";
         }
          

         

  },
  extraReducers: {
    // 1. sign up
    [signupUser.pending]: (state) => {
      state.loading = true;
      state.message="";
      state.error='';
    },
    [signupUser.fulfilled]: (state, action) => {
      console.log("singup-fullfil-31", action.payload);
      state.loading = false;
      state.error='';
      state.message = "User Signup Successfully !";
    },
    [signupUser.rejected]: (state, action) => {
      state.loading = false;
      state.message="";
      console.log("singup-reject",action.payload);
      state.error=  action.payload.status===400? action.payload.data.message : action.payload.statusText
    },
    // 2. signin
    [signinUser.pending]: (state) => {
      state.loading = true;
      state.message='';
      state.error='';
    },
    [signinUser.fulfilled]: (state, action) => {
      // console.log('singin fullfilled',action.payload.message);
      state.loading = false;
      state.accessToken = action.payload.data.accessToken;
      state.refreshToken=action.payload.data.refreshToken;
      state.userData=action.payload.data.userData;
      state.message="Login Successfully !";
      state.error=''
    },
    [signinUser.rejected]: (state, action) => {
      console.log('signin-reject',action.payload);
      state.loading=false
      state.message='';
      state.error=  action.payload.status===400? action.payload.data.message : action.payload.statusText;
    },

    // 3. sending mail
    [sendMail.pending]: (state) => {
      // console.log("pending");
      state.loading = true;
      state.error='';
      state.message='';
    },
    [sendMail.fulfilled]: (state, action) => {
      state.loading = false;
      state.isMailSend = !state.isMailSend;
      state.message="OTP Send To Registered Email !";
      state.error='';
      console.log("filfilled", action.payload);
    },
    [sendMail.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.message='';
      state.loading=false;
      console.log("mail send pending", action.payload);
    },
    // 5.singin with otp
    [sendOtpEmail.pending]: (state) => {
      state.loading = true;
      state.message='';
      state.error='';
    },
    [sendOtpEmail.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error='';
      state.accessToken = action.payload.data.accessToken;
      state.refreshToken=action.payload.data.refreshToken;
      state.userData=action.payload.data.userData;
      state.message="Login Successfully !";
    },
    [sendOtpEmail.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.loading=false;
      state.message=''
      console.log(action.payload);
    },
   // 6. gell all friend 
    [getAll.pending]: (state) => {
      state.loading = true;
      state.error='';
    },
    [getAll.fulfilled]: (state, action) => {
      // console.log('getAll-full', action.payload.data);
      state.loading = false;
      state.users = action.payload.data;
      state.error='';
    },
    [getAll.rejected]: (state, action) => {
      console.log(action.payload);
      state.error = "Something Went Wrong !";
      state.loading=false;
      state.message='';
    },
    // logout 
    [logoutUser.pending]:(state)=>{
      state.loading=false;
      state.error='';
      state.message='';
      
    },
    [logoutUser.fulfilled]:(state,action)=>{
       state.userData="";
       state.message="Logout Successfully !";
       state.error='';
       state.loading=false;
       console.log(action);
    },
    [logoutUser.rejected]:(state,action)=>{
      console.log(action.payload);
      state.error="Something Went Wrong !";
      state.message='';
      state.loading=false;
    }
  },
});
export const authReducer = authSlice.reducer;
export const userAtions = authSlice.actions;

export const tokenSelector = (state) => state.authReducer.token;
