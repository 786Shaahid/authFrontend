import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { logoutUser } from "../redux/reducers/userReducer";

export const Navbar = () => {
  const user= useSelector(state =>state.authReducer.userData );
  const accessToken=useSelector(state=>state.authReducer.accessToken);
  const dispatch=useDispatch();

  const handleLogout= ()=>{
   dispatch(logoutUser(accessToken));
}

  return (
    <>
      <nav>
              <div className="navProfile">
              <div className="navDiv">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="img"
                  className="profile_img"
                />
                <span>hello {user.name}</span>
              </div>
              <div className="navDiv">
              <NavLink to="/" style={navStyle}>
                  home
                </NavLink>
              </div>
              <div className="navDiv">
              <NavLink to="/friendlist" style={navStyle}>
                  friend-List
                </NavLink>
              </div>
              <div className="navDiv">
              <NavLink to="/friendRequest" style={navStyle}>
                  friend-request
                </NavLink>
              </div>
              <div className="navDiv">
              <span>
              <div   onClick={handleLogout} className="logout">
                  Logout
              </div>
              </span>
              </div>
            </div>
      </nav>
      <Outlet />
    </>
  );
};
export const navStyle = ({ isActive }) =>
  isActive ? { color: "yellow" } : { color: "white", textDecoration: "none" };
