import { useDispatch,useSelector } from 'react-redux';
import './errorMessage.css';
import { userAtions } from '../../redux/reducers/userReducer';

export const ErrorMessageShow=()=>{
    const errorUser= useSelector(state=>state.authReducer.error);
    const errorFriend=useSelector(state=>state.friendReducer.error);
    const error= errorUser || errorFriend;
    const dispatch=useDispatch();
    const handleClick=()=>{
        dispatch(userAtions.toggleError());
    }


    return(
        <>

    {
      error && (<div className="notification_box">
     <span>{error ? error :"Something went wrong !"}</span>
    <span className="crossBtn" onClick={handleClick}>&#10006;</span>
    </div>)
    }
        </>
    )
}