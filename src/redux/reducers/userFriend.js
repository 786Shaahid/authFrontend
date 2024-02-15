
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    friendRequestList:[],
    myFriends:[],
    pending:false,
    error:'',
    message:''
}

    /** 1. add friends */ 
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

/** 2. get all friend request */   
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
});

/**3. accept friend request */ 
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

/**4. remove friend request  */ 
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

 /** 5. list of freinds*/ 
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

});

/**6. set friend to user */  
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
});

/** 7. CREATE SLICE FOR FRIEND */
const friendSlice= createSlice({
    name:"friend",
    initialState,
    reducers:{
        messageNullFriendSlice:(state)=>{
             state.message="";
        }
    },
    extraReducers:{
          
       /** I. ADD FRIEND  */ 
          [addFriend.pending]:(state)=>{
                state.pending=true;
                state.error="";
                state.message='';
          },
          [addFriend.fulfilled]:(state,action)=>{
            state.pending=false;
            state.error='';
            state.message="Request send successfully";
            console.log('add_full',action.payload.data.message);
          },
          [addFriend.rejected]:(state,action)=>{
            console.log('addfriend reject',action.paylaod);
            state.error=action.paylaod.data;
            state.pending=false;
            state.message='';
          },
        /** II. GET ALL FRIEND REQUEST LIST*/ 
          [getAllFriendRequest.pending]:(state)=>{
            state.pending=true;
            state.error='';
            state.message='';
          },
          [getAllFriendRequest.fulfilled]:(state,action)=>{
             state.pending=false;
             console.log('getallfriendrequest-fullfilled',action.payload.data);
             state.friendRequestList=action.payload.data
             state.error='';
             state.message=""; 
            
          },
          [getAllFriendRequest.rejected]:(state,action)=>{
            console.log('getallfriendrequest-reject',action.paylaod);
            state.error=action.paylaod.data.error;
            state.message='';
            state.pending='';
          },

          /** III. ACCEPT FRIEND REQUEST  */ 
          [acceptFriend.pending]:(state)=>{
            state.pending=true;
            state.message='';
            state.error='';
          },
          [acceptFriend.fulfilled]:(state,action)=>{
             state.pending=false;
             console.log("acceptfri_fulfilled", action.payload);
             state.friendRequestList= state.friendRequestList.filter((friend)=>friend._id !==action.payload.data )
             state.message= "Friend Request Accepted";
             state.error='';
          },
          [acceptFriend.rejected]:(state,action)=>{
            console.log('acceptfriend-rejected',action.paylaod);
            state.error="Something Went Wrong";
            state.pending=false;
            state.message='';
          },

        /**  IV. REMOVE THE FRIEND REQUEST  */ 
          [removeFriend.pending]:(state)=>{
            state.pending=true;
            state.message='';
            state.error='';
          },
          [removeFriend.fulfilled]:(state,action)=>{
             state.pending=false;
             console.log("removefri_fulfilled", action.payload);
             state.friendRequestList= state.friendRequestList.filter(friend=>friend._id !==action.payload.data);
             state.myFriends= state.myFriends.filter(friend=>friend._id !==action.payload.data)
             state.message="Removed Successully";
             state.error='';
          },
          [removeFriend.rejected]:(state,action)=>{
            console.log('removefriend-reject',action.paylaod);
            state.error="";
            state.message='';
            state.pending=false;
          },
        /** V. FRIEND LIST  */ 
          [friendList.pending]:(state)=>{
            state.pending=true
            state.message='';
            state.error='';
          },
          [friendList.fulfilled]:(state,action)=>{
             state.pending=false;
             console.log("friendlist_fulfilled", action.payload);
             state.myFriends= action.payload.data;
             state.message="";
             state.error='';
          },
          [friendList.rejected]:(state,action)=>{
            console.log('friendList-reject ',action.paylaod);
            state.error=action.paylaod.data.error
            state.pending=false;
            state.message='';
          }
    }
});

export const friendReducer = friendSlice.reducer;
export const friendActions=friendSlice.actions;