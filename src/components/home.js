import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../redux/reducers/userReducer";
import { addFriend, removeFriend } from "../redux/reducers/userFriend";
import { useEffect, useState } from "react";
import { chatActions } from "../redux/reducers/chatReducer";
import { FiLoader } from "react-icons/fi";
import { Skeleton } from "./skeleton";

export const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.authReducer.users);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const accessToken = localStorage.getItem('accessToken');
  const isChatToFriend = useSelector(state => state.chatReducer.isChatToFriend);
  const loadingUser=useSelector(state=> state.authReducer.loading);
  const loadingFri=useSelector(state=> state.friendReducer.loading);


  const [id,setId]=useState('');
  // console.log(id);

  //    Get all user list
  useEffect(() => {
    getData();
  },[]);

 async function getData(){
   await dispatch(getAll(userData._id));
  }

  return (
    <>

    {
     users?.length ? (<div className="suggestion_box">
        {users.map((user, index) => (
          <div className="suggestion_friend_box" key={index}>
            <div className="suggestion">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="pic"
                className="suggestion_pic"
              />
              <h3>{user.name}</h3>
            </div>
            <div className="suggestion">
              {user.friendship?._id ? (
                <button
                  onClick={async(e) => {
                    e.preventDefault();
                    setId(user._id)
                    await dispatch(
                      removeFriend({
                        id: user.friendship?._id,
                        token: accessToken
                      })
                      )
                      dispatch(chatActions.chatBox(isChatToFriend));
                   await getData();

                  }}
                  className="friBtn"
                >
                { ((loadingUser || loadingFri) && id===user._id )? <FiLoader/>: "Remove Friend"}
                
                </button>
              ) : (
                <button
                  onClick={async(e) => {
                    e.preventDefault();
                    setId(user._id)
                    await dispatch(
                      addFriend({
                        userId: userData._id,
                        friendId: user._id,
                        token: accessToken,
                      })
                      );
                      await getData();
                  }}
                  className="friBtn"
                >
                   { ((loadingFri || loadingUser) && id===user._id )? <FiLoader/>: "Add Friend"}
                  
                </button>
              )}
            </div>

          </div>
        ))}
      </div>):(<Skeleton/>)
      }
    </>
  );
};
