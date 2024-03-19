import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { socialAuth } from "../redux/reducers/userReducer";
import { useDispatch } from "react-redux";

 

export const ProtectedRoute=()=>{
 const dispatch=useDispatch();
    
    useEffect(()=>{
        dispatch(socialAuth());
    },[dispatch]);
    const accessToken=localStorage.getItem('accessToken');
    return accessToken? <Outlet/>:<Navigate to="/signin"  />
}


          





