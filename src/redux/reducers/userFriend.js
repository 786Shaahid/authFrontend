
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    friendRequestList:[],
    myFriends:[],
    pending:false,
    error:'',
    message:''
}

    // 1. add friends 
export const addFriend= createAsyncThunk('friend/addFriend',async (data,{fulfillWithValue,rejectWithValue})=>{
  // console.log(data);
         try{
           const friendAdded= await axios.post('/api/friends/addfriend',{
            userId:data.userId,
            friendId:data.friendId
             },{
            headers:{
               Authorization: `Bearer ${data.token}`
            }
            });
            // console.log(friendAdded);
            return fulfillWithValue(friendAdded);
          }catch(err){
  rejectWithValue(err.response.data);
         }
})

// 2. get all friend request 
export const getAllFriendRequest= createAsyncThunk('friend/getAllFriendRequest',async (data,{fulfillWithValue,rejectWithValue})=>{
  // console.log(data);
         try{
           const friendRequest= await axios.get('/api/friends/getAllFriendRequest',{
            headers:{
               Authorization: `Bearer ${data}`
            }
            });
            // console.log(friendRequest.data);
           return fulfillWithValue(friendRequest.data);
         }catch(err){
  rejectWithValue(err.response.data);
         }
})
// 3. accept friend request
export const acceptFriend=createAsyncThunk('friend/acceptFriend',async(data,{fulfillWithValue,rejectWithValue})=>{
  // console.log(data);
   try {
     const response= await axios.post('/api/friends/acceptfriend',{id:data.id},{
      headers:{
        Authorization: `Bearer ${data.token}`
     }
     });
     console.log(response.data);
     return fulfillWithValue( response.data);
   } catch (error) {
    return rejectWithValue(error);
   }
});

// 4. remove friend request 
export const removeFriend=createAsyncThunk('friend/removeFriend',async(data,{fulfillWithValue,rejectWithValue})=>{
  // console.log(data);
   try {
     const response= await axios.post('/api/friends/removefriend',{id:data.id},{
      headers:{
        Authorization: `Bearer ${data.token}`
     }
     });
     console.log(response.data);
     return fulfillWithValue( response.data);
   } catch (error) {
    return rejectWithValue(error)
   }

});

 // 5. list of freinds
export const friendList=createAsyncThunk('friend/friendList',async(data,{fulfillWithValue,rejectWithValue})=>{
  // console.log(data);
   try {
     const response= await axios.post('/api/friends/friendlist',{id:data.id},{
      headers:{
        Authorization: `Bearer ${data.token}`
     }
     });
     console.log(response.data);
     return fulfillWithValue( response.data);
   } catch (error) {
    console.log(error);
    rejectWithValue(error)
   }

})
// 6. set friend to user 
export const isFriendCreated=createAsyncThunk('friend/isFriendCreated',async(data,{rejectWithValue})=>{
      try {
          const response= await axios.post('/api/friends/isFriend',{friendId:data.friendId},{
             headers:{
              Authorization:`Bearer ${data.token}`
             }
          });
          console.log(response);
      } catch (error) {
        console.log(error)
        rejectWithValue(error)
      }
})

const friendSlice= createSlice({
    name:"friend",
    initialState,
    reducers:{
        filterFriends:(state,action)=>{
             
        }
    },
    extraReducers:{
          [addFriend.pending]:(state)=>{
                state.pending=true;
          },
          [addFriend.fulfilled]:(state,action)=>{
            state.pending=false;
            // console.log('add_full',action.payload.data.message);
            state.message=action.payload.data.message
          },
          [addFriend.rejected]:(state,action)=>{
            state.error=action.paylaod.data
          },

          [getAllFriendRequest.pending]:(state)=>{
            state.pending=true
          },
          [getAllFriendRequest.fulfilled]:(state,action)=>{
             state.pending=false;
             console.log(action.payload.data);
             state.friendRequestList=action.payload.data

            
          },
          [getAllFriendRequest.rejected]:(state,action)=>{
            console.log(action.paylaod);
            // state.error=action
          },
          [acceptFriend.pending]:(state)=>{
            state.pending=true
          },
          [acceptFriend.fulfilled]:(state,action)=>{
             state.pending=false;
             console.log("acceptfri_fulfilled", action.payload);
             state.friendRequestList= state.friendRequestList.filter((friend)=>friend._id !==action.payload.data )
             state.message=action.payload.message
          },
          [acceptFriend.rejected]:(state,action)=>{
            console.log(action.paylaod);
            // state.error=action
          },
          [removeFriend.pending]:(state)=>{
            state.pending=true
          },
          [removeFriend.fulfilled]:(state,action)=>{
             state.pending=false;
             console.log("removefri_fulfilled", action.payload);
             state.friendRequestList= state.friendRequestList.filter(friend=>friend._id !==action.payload.data);
             state.myFriends= state.myFriends.filter(friend=>friend._id !==action.payload.data)
             state.message=action.payload.message
          },
          [removeFriend.rejected]:(state,action)=>{
            console.log(action.paylaod);
            // state.error=action
          },

          [friendList.pending]:(state)=>{
            state.pending=true
          },
          [friendList.fulfilled]:(state,action)=>{
             state.pending=false;
             console.log("friendlist_fulfilled", action.payload);
             state.myFriends= action.payload.data;
             state.message=action.payload.message
          },
          [friendList.rejected]:(state,action)=>{
            console.log(action.paylaod);
            state.error=action
          }
    }
});

export const friendReducer = friendSlice.reducer;
export const friendActions=friendSlice.actions;