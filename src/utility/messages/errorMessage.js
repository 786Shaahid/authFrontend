// import { useDispatch ,useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import './errorMessage.css';
import { userAtions } from '../../redux/reducers/userReducer';

export const ErrorMessageShow=({error})=>{
    // const error= useSelector(state=>state.authReducer.error);
    const dispatch=useDispatch();
    const handleClick=()=>{
        dispatch(userAtions.toggleError());
    }


    return(
        <>
    <div className="notification_box">
     <span>{error ? error :"Something went wrong !"}</span>
    <span className="crossBtn" onClick={handleClick}>&#10006;</span>
    </div>
        </>
    )
}