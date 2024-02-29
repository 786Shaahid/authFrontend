import { useDispatch, useSelector } from "react-redux";
import { getAll, userActions } from "../redux/reducers/userReducer";
import { addFriend, removeFriend } from "../redux/reducers/userFriend";
import { useEffect } from "react";
import { chatActions } from "../redux/reducers/chatReducer";
// import { FiLoader } from "react-icons/fi";

export const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.authReducer.users);
  const userData= JSON.parse(localStorage.getItem('userData'))
  const accessToken=localStorage.getItem('accessToken')
  // const loading=useSelector(state=>state.authReducer.loading)
  const isChatToFriend = useSelector(state => state.chatReducer.isChatToFriend)
// console.log(users);

  //    Get all user list
  useEffect(() => {
    dispatch(getAll(userData._id));
  }, [dispatch, userData._id]);

  return (
    <>
      

      <div className="suggestion_box">
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
            {/* <div className="suggestion">
              {
               user.friendship?.status==='pending' ? (<button
                onClick={(e) => {
                  e.preventDefault()
                }} 
                className="friBtn"
              >
                { user.friendship?.status==='pending' ? "Request sent" : user.friendship?.status==='accept'? "Remove Friend":"Add Friend" }
                
              </button>): user.friendship?.status==='accept' ? (<button
                  onClick={(e) => {
                    e.preventDefault();
                     
                  }}
                  className="friBtn"
                >
                  { user.friendship?.status==='pending' ? "Request sent" : user.friendship?.status==='accept'? "Remove Friend":"Add Friend" }
                  
                </button>): "Add Friend"    
              }
            </div> */}
             <div className="suggestion">
              {user.friendship?._id ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      removeFriend({
                        id: user.friendship?._id,
                        token: accessToken,
                      })
                    );
                    dispatch(
                      userActions.updateBtnInSuggestionFriend({
                        user,
                        friendshipID: user.friendship?._id,
                        index,
                      })
                    );
                    dispatch(chatActions.chatBox(isChatToFriend))
                  }}
                  className="friBtn"
                >
                {/* { user.friendship?.status==='pending' ? "Request sent" : user.friendship?.status==='accept'? "Remove Friend":"Add Friend" } */}
                Remove Friend
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      addFriend({
                        userId: userData._id,
                        friendId: user._id,
                        token: accessToken,
                      })
                    );
                    dispatch(
                      userActions.updateBtnInSuggestionFriend({
                        user,
                        friendship: user.friendship?._id,
                        index,
                      })
                    );
                  }}
                  className="friBtn"
                >
                  {/* { user.friendship?.status==='pending' ? "Request sent" : user.friendship?.status==='accept'? "Remove Friend":"Add Friend" } */}
                  Add Friend
                </button>
              )}
            </div> 
            
          </div>
        ))}
      </div>
    </>
  );
};
