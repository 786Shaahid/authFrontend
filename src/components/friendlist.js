import { useDispatch, useSelector } from "react-redux";
import { friendList, removeFriend } from "../redux/reducers/userFriend";
import { useEffect, useState } from "react";
import { chatActions } from "../redux/reducers/chatReducer";
import { Chat } from "./chat";
import { Skeleton } from "./skeleton";

export const FriendList = () => {
   const [friendData,setFriendData]=useState({});
   const myFriends = useSelector(state => state.friendReducer.myFriends);
   const accessToken=localStorage.getItem('accessToken');
   const isChatToFriend = useSelector(state => state.chatReducer.isChatToFriend);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(friendList({ token: accessToken }));
   }, [dispatch, accessToken])

   return (
      <>
            {
              myFriends?.length ?  ( <div className="suggestion_box" >
                 {myFriends.map((friend,index) => (
               <div className={`suggestion_friend_box ${isChatToFriend ? 'disabled' : ''}`} key={index}>
                  <div className="suggestion">
                     <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="pic" className="suggestion_pic" />
                     <h3>{friend.acceptedFriendList.name}</h3>
                  </div>
                  <div className="suggestion" >
                     <button onClick={(e) => {
                        e.preventDefault();
                        dispatch(removeFriend({ id: friend._id, token: accessToken }));
                     }}
                        className="friBtn">Remove</button>
                        <button onClick={(e) => {
                           e.preventDefault();
                           setFriendData({id:friend.acceptedFriendList._id,friendName:friend.acceptedFriendList.name}) 
                           dispatch(chatActions.chatBox(isChatToFriend));
                        }}
                           className="friBtn"
                        >Chat</button>
                    
                  </div>
               </div>))}
         </div>):(<Skeleton message={myFriends.length ? "":"You have no friend"} />)  
               }
            
         
         {  isChatToFriend &&   ( <div className="chat">
        <Chat friendData={friendData}/>
      </div>)}

      </>
   )

}