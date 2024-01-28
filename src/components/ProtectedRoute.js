import { Navigate, Outlet } from "react-router-dom";

 

export const ProtectedRoute=({ userData})=>{
    return userData._id ? <Outlet/>:<Navigate to="/signin"  />
}


          





