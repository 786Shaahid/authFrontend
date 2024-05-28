import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { NavLink, useNavigate } from "react-router-dom";
import { navStyle } from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import {  signinUser} from "../redux/reducers/userReducer";
import {  useState } from "react";
import BASE_URL from "../utility/environment";



export const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.authReducer.error);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const loginWithGoogle= ()=>{
     window.open(`${BASE_URL}/api/users/auth/google/callback`,'_self');
  }
  
  // const loginWithFacebook=()=>{
  //    window.open(`${BASE_URL}/api/users/auth/facebook/callback`,'_self')
  // }
  

  

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await dispatch(signinUser(user));
      console.log(result.payload);
      if (result.payload?.success) {
        console.log(result);
        navigate('/');
      }
    } catch (error) {
      setUser({});
      console.log(error);
    }
  };
  return (
    <>
      
      <div className={`container color_blue ${error ? "disabled":""}`}>
        <h1>SignIn </h1>
        <form onSubmit={handleSubmit}>
          <label>Enter Your Email </label>
          <br />
          <input
            type="text"
            value={user.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            name="email"
            placeholder="Enter your email"
            required
          />
          <br />
          <br />
          <label>Enter Your Password </label>
          <br />
          <input
            type="text"
            name="passport"
            value={user.password || ""}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            required
          />
          <br/>
          <br />
          <input type="submit" className="btn-style" value="Submit" />
        </form>
        <div className="seperator_line">
          <span className="line"> </span>{" "}
          <span className="margin_right margin_left">or</span>
          <span className="line"> </span>
        </div>
        <div className="logBtn">
          <span className="margin_right">
            <FcGoogle />
          </span>
          <span className="social_auth" onClick={loginWithGoogle}>
              Sign in with google
          </span>
        </div>
        {/* <div className="logBtn">
          <span className="margin_right">
            <FaFacebook />
          </span>
          <span className="social_auth" onClick={loginWithFacebook}>
              Sign in with Facebook
          </span>
        </div> */}
        <div className="logBtn">
          <span className="margin_right">
            <TfiEmail />
          </span>
          <NavLink to="/signinbyemail" style={navStyle}>
            <span>Sign in throw Email</span>
          </NavLink>
        </div>
        <div className="seperator_line">
          <span className="line"> </span>{" "}
          <span className="margin_right margin_left">
            If user not registored
          </span>
          <span className="line"> </span>
        </div>
        <div className="logBtn">
          <NavLink to="/signup" style={navStyle}>
            <span>Sign up</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};
