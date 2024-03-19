import { useEffect } from 'react';
import { friendActions } from '../../redux/reducers/userFriend';
import { userActions } from '../../redux/reducers/userReducer';
import   './responseMessage.css';
import { useDispatch, useSelector } from 'react-redux';
export const ShowResponse = () => {
    // const loadingUser = useSelector(state => state.authReducer.loading);
    const messageUser = useSelector(state => state.authReducer.message);
    // const pendingFriend = useSelector(state => state.friendReducer.pending);
    const messageFriend = useSelector(state => state.friendReducer.message);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(userActions.messageNullUserSlice());
        dispatch(friendActions.messageNullFriendSlice());
    }

    useEffect(() => {
        setTimeout(() => {
            dispatch(userActions.messageNullUserSlice());
            dispatch(friendActions.messageNullFriendSlice());
        }, 4000)
    });

    return (
        <>
            {

                 (messageUser || messageFriend) && (<div className="responseContainer">
                    <div className='response'>
                        <div className="responseIcon"> &#10003;</div>
                        <div className='message' >{messageUser ? messageUser : messageFriend}</div>
                    </div>
                    <div className='deleteIcon crossBtn' onClick={handleClick}>
                        &#10006;
                    </div>
                </div>)

            }
        </>
    )
}