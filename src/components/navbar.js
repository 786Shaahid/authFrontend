import {NavLink,Outlet} from "react-router-dom";

export const navStyle=({isActive})=>
    (
        isActive ? {color:"yellow" }:{color:"white",textDecoration:"none"} 
    );
export const Navbar=()=>{
    return(
        <>
         <nav >
          <ul className="navBox" >
            <li>
                <NavLink to='/' style={navStyle}>
                   Home 
                </NavLink>
            </li>
            <li>
                <NavLink to="/signin"  style={navStyle}>
                   Sign in
                </NavLink>
                
            </li>
            <li>
                <NavLink to="/signup" style={navStyle}>
                   Sign up
                </NavLink>
                
            </li>
            
            <li>
                <NavLink to="/signinbyemail" style={navStyle} >
                Sign in with email 
                </NavLink>
            </li>
            <li>
                <NavLink to="/logout" style={navStyle}>
                Logout 
                </NavLink>
            </li>
          </ul>
         </nav>
         <Outlet />

        </>
    )
}