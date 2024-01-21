import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import axios from "axios"
// import io from 'socket.io-client';




// 1. initialize the chat 
   const initialState={
      isChatToFriend:false,
      messages: [],
   }
  

//   // 2. send message to the server 
// export const sendMessageToServer= createAsyncThunk('chat/sendMessage',async(data,{rejectwithValue})=>{
//         try {
//               const result=await axios.post('/api/friends/sendMessage',{message:data.message},{
//                 headers: `Bearer ${data.token}`
//               });
//               console.log(result);
//         } catch (error) {
//           console.log(error);  
//         } 

// })
  // 3. create slice for chat 
  const chatSlice= createSlice({
        name:"Chat",
        initialState,
        reducers:{
            chatFriend: (state, action) => {
                  console.log(action.payload);
                  state.isChatToFriend =!action.payload
                },
                // Add a reducer to handle receiving messages from Socket.io
             receiveMessage: (state, action) => {
             state.messages.push({
             senderSocketId: action.payload.senderSocketId,
             message: action.payload.message,
      });
    },

        },
      //   extraReducers:{
      //         [sendMessageToServer.pending]:(state)=>{

      //         },
      //         [sendMessageToServer.fulfilled]:(state,action)=>{

      //         },
      //         [sendMessageToServer.rejected]:(state,action)=>{

      //         }
      //   }
  })

        // 4. create reducer and actions for chat slice 
             export const chatReducer= chatSlice.reducer;
             export const chatActions=chatSlice.actions;

             // Initialize Socket.io connection
// const socket = io('http://localhost:8080'); // Update with your server URL

// // Listen for private messages from the server
// socket.on('privateMessage', (data) => {
//   store.dispatch(chatActions.receiveMessage(data));
// });