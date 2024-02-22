import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { NavLink, useNavigate } from "react-router-dom";
import { navStyle } from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import { facebookAuth, googleAuth, signinUser } from "../redux/reducers/userReducer";
import { useState } from "react";
// import { ErrorMessageShow } from "../utility/messages/errorMessage";
// import { userActions } from "../redux/reducers/userReducer";
export const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(state => state.authReducer.accessToken);
  const refreshToken = useSelector(state => state.authReducer.refreshToken);
  const error = useSelector(state => state.authReducer.error);
  // const userloginData=useSelector(state=>state.authReducer.userloginData);
  //  console.log(userloginData);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await dispatch(signinUser(user));
      if (result.payload?.success) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        navigate('/');
      }else{
        if(error) setUser({});

      }
    } catch (error) {
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
            // onChange={(e) => dispatch(userActions.userLogin({...userloginData,email:e.target.value}))}
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
            // onChange={(e) => dispatch(userActions.userLogin({...userloginData,password:e.target.value}))}
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
          <span className="social_auth" onClick={()=>dispatch(googleAuth())}>
              Sign in with google
          </span>
        </div>
        <div className="logBtn">
          <span className="margin_right">
            <FaFacebook />
          </span>
          <span className="social_auth" onClick={()=>dispatch(facebookAuth())}>
              Sign in with Facebook
          </span>
        </div>
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
