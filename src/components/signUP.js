import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { navStyle } from "./navbar";
import { useState } from "react";
import { facebookAuth, googleAuth, signupUser } from "../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessageShow } from "../utility/messages/errorMessage";
// import { Loader } from "../utility/Loder/loader";
// import axios from "axios";

export const SingUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userData= useSelector(state=>state.authReducer.userSignup);

  const error = useSelector(state => state.authReducer.error);
  // console.log(error);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleFormData = async (e) => {
    e.preventDefault();
    // console.log(error);
    // setUserData(use)
    const result = await dispatch(signupUser(userData));
    if (result.payload.success) {
      navigate("/signin");
    }
    setUserData({});
  }

  return (
    <>
      {
        (error && <ErrorMessageShow />)
       }
      <div className={`container color_blue ${error ? "disabled" : ''}`}>
        <h1>SignUp </h1>
        <form onSubmit={handleFormData}>
          <label>Enter Your Name</label>
          <br />
          <input type="text" name="name" value={userData.name || ""} placeholder="Enter your name" onChange={(event) => setUserData({ ...userData, name: event.target.value })} />
          <br />
          <br />
          <label>Enter Your Email </label>
          <br />
          <input type="text" name="email" value={userData.email || ""} placeholder="Enter your email" onChange={e => setUserData({ ...userData, email: e.target.value })} />
          <br />
          <br />
          <label>Enter Your Password </label>
          <br />
          <input
            type="text"
            name="password"
            value={userData.password || ""}
            placeholder="Enter your password"
            onChange={e => setUserData({ ...userData, password: e.target.value })}
          />
          <br />
          <br />
          <input type="submit" className="btn-style" value="Submit" />
        </form>
        <div className="seperator_line">
          <span className="line"> </span>
          <span className="margin_right margin_left">or</span>
          <span className="line"> </span>
        </div>
        <div className="logBtn">
          <span className="margin_right">
            <FcGoogle />
          </span>
          <span className="social_auth" onClick={() => dispatch(googleAuth())}>
            Sign in with google
          </span>
        </div>
        <div className="logBtn">
          <span className="margin_right">
            <FaFacebook />
          </span>
          <span className="social_auth" onClick={() =>  dispatch(facebookAuth())}>
            Sign in with Facebook
          </span>
        </div>
        <div className="seperator_line">
          <span className="line"> </span>
          <span className="margin_right margin_left">If user registered</span>
          <span className="line"> </span>
        </div>
        <div className="logBtn">
          <NavLink to="/signin" style={navStyle}>
            <span>Sign in</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};
