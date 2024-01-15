import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"




// 1. initialize the chat 
   const initialState={
      isChatToFriend:false,
       receveMess:'',
       sendMess:''
   }
  

  // 2. send message to the server 
export const sendMessageToServer= createAsyncThunk('chat/sendMessage',async(data,{rejectwithValue})=>{
        try {
              const result=await axios.post('/api/friends/sendMessage',{message:data.message},{
                headers: `Bearer ${data.token}`
              });
              console.log(result);
        } catch (error) {
          console.log(error);  
        } 

})
  // 3. create slice for chat 
  const chatSlice= createSlice({
        name:"Chat",
        initialState,
        reducers:{
            chatFriend: (state, action) => {
                  console.log(action.payload);
                  state.isChatToFriend =!action.payload
                }
        },
        extraReducers:{
              [sendMessageToServer.pending]:(state)=>{

              },
              [sendMessageToServer.fulfilled]:(state,action)=>{

              },
              [sendMessageToServer.rejected]:(state,action)=>{

              }
        }
  })

        // 4. create reducer and actions for chat slice 
             export const chatReducer= chatSlice.reducer;
             export const chatActions=chatSlice.actions;