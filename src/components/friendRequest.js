import { useDispatch, useSelector } from "react-redux";
import { acceptFriend, getAllFriendRequest, removeFriend } from "../redux/reducers/userFriend";
import { useEffect } from "react";
import { Skeleton } from "./skeleton";

export const FriendRequest = () => {
    const dispatch = useDispatch();
    const accessToken=localStorage.getItem('accessToken');
    const friendRequestList = useSelector(state => state.friendReducer.friendRequestList);
    useEffect(() => {
        dispatch(getAllFriendRequest(accessToken))
    }, [dispatch, accessToken])

    return (
        <>
        {
         friendRequestList.length ?  ( <div className="suggestion_box">
                {

                         friendRequestList.map((friend) =>
                        (
                            <div className="suggestion_friend_box" key={friend._id} >
                                <div className="suggestion">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="pic" className="suggestion_pic" />
                                    <h3>{friend.friendDetails.name}</h3>
                                </div>
                                <div className="suggestion" >
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(acceptFriend({ id: friend._id, token: accessToken }))
                                    }}
                                        className="friBtn">Accept</button>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(removeFriend({ id: friend._id, token: accessToken }));
                                        //  navigate('/chat')
                                    }}
                                        className="friBtn"
                                    >Cancel</button>
                                </div>
                            </div>
                        )
                        )
                }
            </div>): (<Skeleton message={friendRequestList.length ? "":"You haven't got any friend request"} />)
}
        </>
    )

}
