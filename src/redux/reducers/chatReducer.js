import {  createSlice } from "@reduxjs/toolkit"

// 1. initialize the chat 
   const initialState={
      isChatToFriend:false,
      messages: [],
      friendInfo:{
         id:"",
         name:""
      }
   }
  

  // 2. create slice for chat 
  const chatSlice= createSlice({
        name:"Chat",
        initialState,
        reducers:{
            chatBox: (state, action) => {
                  state.isChatToFriend =!action.payload
                },
        },
  })

        // 3. create reducer and actions for chat slice 
             export const chatReducer= chatSlice.reducer;
             export const chatActions=chatSlice.actions;

          