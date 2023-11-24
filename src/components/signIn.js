import {FcGoogle} from "react-icons/fc"
import {FaFacebook} from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import {NavLink} from "react-router-dom";
import { navStyle } from "./navbar";


export const SignInPage=()=>{
    return (
        <>
          <div className="container color_blue">
            <h1>SignIn  </h1>
            <form >
                <label>Enter Your Email </label><br/>
                <input type="text" name="email" placeholder="Enter your email"/><br/><br/>
                <label>Enter Your Password </label><br/>
                <input type="text" name="passport" placeholder="Enter your password"/><br/><br/>
              <input type="submit" className="btn-style" value="Submit" />
            </form>
            <div className="seperator_line">
            <span className="line"> </span> <span className="margin_right margin_left">or</span><span className="line"> </span> 
            </div>
           <div className='logBtn'>
              <span className="margin_right"><FcGoogle/></span>
              <span >Sign in with google</span>
           </div>
           <div className='logBtn'>
              <span className="margin_right"><FaFacebook/></span>
              <span >Sign in with Facebook</span>
           </div>
           <div className='logBtn'>
            <span className="margin_right"><TfiEmail/></span>
             <NavLink to="/signinbyemail" style={navStyle}>
              <span >Sign in throw Email</span>

             </NavLink>
           </div>
           <div className="seperator_line">
            <span className="line"> </span> <span className="margin_right margin_left">If user not registored</span><span className="line"> </span> 
            </div>
            <div className='logBtn'>
              <NavLink to='/signup' style={navStyle}>
              <span >Sign up</span>
              </NavLink>
              
           </div>
          </div>
        </>
      );
}