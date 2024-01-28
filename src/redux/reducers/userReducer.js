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
  users: [],
};

// create action
/**1.Sing up */
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (user, { rejectWithValue ,fulfillWithValue}) => {
    try {
      const response = await axios.post("/api/users/signup", user);
      // console.log("response",response.data);
      return fulfillWithValue(response.data); 
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
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
          const {user,friendship,index}= action.payload;
              
               

         },
         isEmailSend:(state,action)=>{
          console.log(action.payload);
            state.isMailSend= !action.payload
         },
          
  },
  extraReducers: {
    // 1. sign up
    [signupUser.pending]: (state) => {
      state.loading = true;
    },
    [signupUser.fulfilled]: (state, action) => {
      console.log("singup-fullfil-31", action.payload);
      state.loading = false;
      state.message = action.payload.message;
    },
    [signupUser.rejected]: (state, action) => {
      state.loading = false;
      console.log("singup-reject",action.payload.response.data.error);
      state.error = action.payload.response.data.error;
    },
    // 2. signin
    [signinUser.pending]: (state) => {
      state.loading = true;
    },
    [signinUser.fulfilled]: (state, action) => {
      // console.log('singin fullfilled',action.payload.message);
      state.loading = false;
      state.accessToken = action.payload.data.accessToken;
      state.refreshToken=action.payload.data.refreshToken;
      state.userData=action.payload.data.userData
      state.message=action.payload.message
    },
    [signinUser.rejected]: (state, action) => {
      console.log('signin-reject',action.payload);
      state.error = action.payload.data.message;
    },

    // 3. sending mail
    [sendMail.pending]: (state) => {
      // console.log("pending");
      state.loading = true;
    },
    [sendMail.fulfilled]: (state, action) => {
      state.loading = false;
      state.isMailSend = !state.isMailSend;
      console.log("filfilled", action.payload);
    },
    [sendMail.rejected]: (state, action) => {
      state.error = action.payload;
      console.log("mail send pending", action.payload);
    },
    // 5.singin with otp
    [sendOtpEmail.pending]: (state) => {
      state.loading = true;
    },
    [sendOtpEmail.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.accessToken = action.payload.data.accessToken;
      state.refreshToken=action.payload.data.refreshToken;
      state.userData=action.payload.data.userData
      state.message=action.payload.message
    },
    [sendOtpEmail.rejected]: (state, action) => {
      state.err = action.payload;
      console.log(action.payload);
    },
   // 6. gell all friend 
    [getAll.pending]: (state) => {
      state.loading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      // console.log('getAll-full', action.payload.data);
      state.loading = false;
      state.users = action.payload.data;
    },
    [getAll.rejected]: (state, action) => {
      // console.log(action);
      state.error = action.payload;
    },
    // logout 
    [logoutUser.pending]:(state)=>{
      state.loading=false;
    },
    [logoutUser.fulfilled]:(state,action)=>{
       state.userData="";
       console.log(action);
    },
    [logoutUser.rejected]:(state,action)=>{
      console.log(action.payload);
      state.error=action.payload
    }
  },
});
export const authReducer = authSlice.reducer;
export const userAtions = authSlice.actions;

export const tokenSelector = (state) => state.authReducer.token;
