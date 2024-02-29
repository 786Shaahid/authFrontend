import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL ;
// const BASE_URL=process.env.REACT_APP_LOCAL_URL;
const initialState = {
  isMailSend: false,
  emailToken: {},
  error: "",
  message: "",
  accessToken:"",
  refreshToken:"",
  userData:{},
  loading: false,
  users: [],
  userloginData:{
    email:"",
    password:"",
  }
};

// create action
/**1.Sing up */
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (user , { rejectWithValue ,fulfillWithValue}) => {
    try {
      // const response = await axios.post(`/api/users/signup`, user);
      const response = await axios.post(`${BASE_URL}/api/users/signup`, user);
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
      // const response = await axios.post(`/api/users/signin`, user);
      const response = await axios.post(`${BASE_URL}/api/users/signin`, user);
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
      // const response = await axios.post(`/api/users/sendmail`, data);
      const response = await axios.post(`${BASE_URL}/api/users/sendmail`, data);
      // console.log(response.data);
      return fulfillWithValue(response.data);
    } catch (err) {
      console.log(err);
     return rejectWithValue(err);
    }
  }
);
// b. send otp
export const sendOtpEmail = createAsyncThunk(
  "auth/sendOtp",
  async (data, { rejectWithValue ,fulfillWithValue}) => {
    try {
      // const response = await axios.post(`/api/users/singinotp`, data);
      const response = await axios.post(`${BASE_URL}/api/users/singinotp`, data);
      // console.log(response.data);
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
    // const response = await axios.post(`/api/users/getall`,{id:data});
    const response = await axios.post(`${BASE_URL}/api/users/getall`,{id:data});
    return fulfillWithValue(response.data);
  } catch (err) {
   return rejectWithValue(err);
  }
});

 /**5. Logout User */
  export const logoutUser= createAsyncThunk('auth/logout',async(data,{fulfillWithValue,rejectWithValue})=>{
    // console.log(data);
    try {
   const response= await axios.get(`${BASE_URL}/api/users/logout`,{
  //  const response= await axios.get(`/api/users/logout`,{
    headers:{
      Authorization: `Bearer ${data}`
   }
    });
    // console.log(response);
  return  fulfillWithValue(response.data);
 } catch (error) {
  return rejectWithValue(error);
 }
  })

  /** 6.  GOOOGEL AUTHENTICATION */
export const googleAuth=createAsyncThunk('/auth/googleAuth',async({rejectWithValue,fulfillWithValue})=>{
      try {
            //  const response= await axios.get(`/api/users/auth/google`);
             const response= await axios.get(`${BASE_URL}/api/users/auth/google`);
             console.log(response);
             return fulfillWithValue(response.data);
      } catch (error) {
          console.log(error);
        return rejectWithValue(error.data);        
      }

})
  /** 7.  GOOOGEL AUTHENTICATION */
export const facebookAuth=createAsyncThunk('auth/facebookAuth',async(data,{rejectWithValue,fulfillWithValue})=>{
      try {
            //  const response= await axios.get(`/api/users/auth/facebook`);
             const response= await axios.get(`${BASE_URL}/api/users/auth/facebook`);
             return fulfillWithValue(response.data);
      } catch (error) {
        console.log(error);
        return rejectWithValue(error)        
      }

})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
         userLogin:(state,action)=>{
            console.log("USER-LOGIN",action.payload);
            state.userloginData=action.paylaod;
            // state.userloginData.password=action.payload;
         },
         updateBtnInSuggestionFriend:(state,action)=>{
          const {user,friendshipID,index} = action.payload;
          const userCopy={...user}
          if(friendshipID){
            userCopy.friendship="";
            state.users[index]=userCopy;
          }else{
            userCopy.friendship={_id:'334534t4554335'} // creating id by default
            state.users[index]=userCopy;
          }
         },
          toggleError:(state)=>{
            state.error="";  
            state.loading=false; 
            state.userloginData={};
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
      console.log("singup-reject",action.payload);
      state.loading = false;
      state.message="";
      state.error=  action.payload?.status===400? action.payload?.data.message : action.payload?.statusText
    },
    // 2. signin
    [signinUser.pending]: (state) => {
      console.log("loading");
      state.loading = true;
      state.message='';
      state.error='';
    },
    [signinUser.fulfilled]: (state, action) => {
      console.log('singin fullfilled',action.payload);
      state.loading = false;
      state.accessToken = action.payload.data.accessToken;
      state.refreshToken=action.payload.data.refreshToken;
      state.userData=action.payload.data.userData;
      localStorage.setItem('accessToken',action.payload.data.accessToken);
      localStorage.setItem('userData',JSON.stringify(action.payload.data.userData));
      state.message="Login Successfully !";
      state.error=''
    },
    [signinUser.rejected]: (state, action) => {
      console.log('signin-reject',action);
      state.loading=false
      state.message='';
      state.error=  action.payload?.status===400? action.payload?.data.message : action.payload?.statusText
    },

    // 3. sending mail
    [sendMail.pending]: (state) => {
      // console.log("pending");
      state.loading = true;
      state.error='';
      state.message='';
    },
    [sendMail.fulfilled]: (state, action) => {
      // console.log("filfilled", action.payload);
      state.isMailSend = !state.isMailSend;
      state.error='';
      state.loading = false;
      state.message="OTP Send To Registered Email !";
    },
    [sendMail.rejected]: (state, action) => {
      // console.log("mail send pending", action.payload);
      state.error = action.payload?.response?.data?.error;
      state.message='';
      state.loading=false;
    },
    // 5.singin with otp
    [sendOtpEmail.pending]: (state) => {
      state.loading = true;
      state.message='';
      state.error='';
    },
    [sendOtpEmail.fulfilled]: (state, action) => {
      // console.log(action.payload.data.userData);
      state.loading = false;
      state.accessToken = action.payload.data.accessToken;
      state.refreshToken=action.payload.data.refreshToken;
      state.userData=action.payload.data.userData;
      localStorage.setItem('accessToken',action.payload.data.accessToken);
      localStorage.setItem('userData',JSON.stringify(action.payload.data.userData));
      state.message="Login Successfully !";
      state.error=''
    },
    [sendOtpEmail.rejected]: (state, action) => {
      // console.log('send otp-reject',action.payload);
      state.error = action.payload?.response?.data?.error;
      state.loading=false;
      state.message=''
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
      // console.log(action.payload);
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
      //  console.log(action);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
       state.userData="";
       state.message="Logout Successfully !";
       state.error='';
       state.loading=false;
    },
    [logoutUser.rejected]:(state,action)=>{
      // console.log(action.payload);
      state.error="Something Went Wrong !";
      state.message='';
      state.loading=false;
    },

    // GOOOGLE AUTHENTICATION
   [googleAuth.pending]:(state)=>{
      state.error='';
      state.message='';
      state.loading=true;
   },
   [googleAuth.fulfilled]:(state,action)=>{
    // console.log('google-fullfilled',action.payload);
       state.loading=false;
       state.message="Login Successfully";
       state.error='';

   },
   [googleAuth.rejected]:(state,action)=>{
      // console.log("google-reject",action.payload);
      state.loading=false;
      state.message='';
      state.error="Something Went Wrong";
   },
    // FACEBOOK AUTHENTICATION
   [facebookAuth.pending]:(state)=>{
      state.error='';
      state.message='';
      state.loading=true;
   },
   [facebookAuth.fulfilled]:(state,action)=>{
    // console.log('facebook-fullfilled',action.payload);
       state.loading=false;
       state.message="Login Successfully";
       state.error='';

   },
   [facebookAuth.rejected]:(state,action)=>{
      // console.log("facebook-reject",action.payload);
      state.loading=false;
      state.message='';
      state.error=action.payload?.error;
   }



  },
});
export const authReducer = authSlice.reducer;
export const userActions = authSlice.actions;

export const tokenSelector = (state) => state.authReducer.token;
