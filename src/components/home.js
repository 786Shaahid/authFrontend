import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { getAll, userAtions } from "../redux/reducers/userReducer";
import { addFriend, removeFriend } from "../redux/reducers/userFriend";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.authReducer.users);
  const userData = useSelector((state) => state.authReducer.userData);
  const accessToken = useSelector((state) => state.authReducer.accessToken);


  //    Get all user list 
  useEffect(() => {
    dispatch(getAll(userData._id))
  }, [dispatch, userData._id]);

  return (
    <>
    
      <div className="suggestion_box">
        {users.map((user,index) => (
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
              {user.friendship?._id ? (<button
                onClick={(e) => {
                  e.preventDefault();
                  // dispatch(userAtions.updateBtnInSuggestionFriend({user,friendship:user.friendship?._id,index}))
                  dispatch(removeFriend({ id: user.friendship?._id, token: accessToken }))
                }}
                className="friBtn"
                >
                Cancel
              </button>) : (
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
                    dispatch(userAtions.updateBtnInSuggestionFriend({user,friendship:user.friendship?._id,index}))
                   }}
                  className="friBtn"
                >
                  Add+
                </button>
              )
              }
            </div>
          </div>
        ))}
      </div>
    
     
    </>
  );
};
