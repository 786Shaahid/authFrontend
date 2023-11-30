import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import { navStyle } from "./navbar";
import { useState } from "react";

export const SignInPage = () => {
  const [user,setUser]=useState({
    email:'',
    password:''
  });

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(user);
  }
  return (
    <>
      <div className="container color_blue">
        <h1>SignIn </h1>
        <form onSubmit={handleSubmit}>
          <label>Enter Your Email </label>
          <br />
          <input type="text" 
           value={user.email || ""}
           onChange={e=>setUser({...user,email:e.target.value})}
          name="email" placeholder="Enter your email" />
          <br />
          <br />
          <label>Enter Your Password </label>
          <br />
          <input
            type="text"
            name="passport"
            onChange={e=>setUser({...user,password:e.target.value})}
            value={user.password || ""}
            placeholder="Enter your password"
          />
          <br />
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
          <span>
            <a href="https://authbackend-74z0.onrender.com/api/users/auth/google">
              {" "}
              Sign in with google
            </a>
          </span>
        </div>
        <div className="logBtn">
          <span className="margin_right">
            <FaFacebook />
          </span>
          <span>
            <a href="https://authbackend-74z0.onrender.com/api/users/auth/facebook">
              {" "}
              Sign in with Facebook
            </a>
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
