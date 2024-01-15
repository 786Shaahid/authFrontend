import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, sendMail, sendOtpEmail } from "../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";

export const SignInWithEmail = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [otp, setOtp] = useState("");
  let isMailSend = useSelector((state) => state.isMailSend);
  // let emailOtp=useSelector(state=> state.signinWithEmail);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  // handle submit send email
  const handleEmailMessage = (e) => {
    e.preventDefault();
    dispatch(sendMail({ email: inputEmail }));
    // dispatch(emailOtp.email="");
    setInputEmail("");
  };
  // handle sending otp
  const handleOTP = (e) => {
    e.preventDefault();
    dispatch(sendOtpEmail({ otp: otp }));
    setOtp("");
    navigate('/home');
     dispatch(getAll()); 
  };
  return (
    <>
      <div className="container color_blue">
        {isMailSend ? (
          <>
            <h1>Enter OTP for login </h1>
            <form onSubmit={handleOTP}>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP Number"
                onChange={(e) => setOtp(e.target.value)}
              />
              <br />
              <br />
              <input type="submit" className="btn-style" value="Signin" />
            </form>
          </>
        ) : (
          <>
            <h1>SignIn With Email </h1>
            <form onSubmit={handleEmailMessage}>
              <input
                type="text"
                name="email"
                onChange={(e) => setInputEmail(e.target.value)}
                placeholder="Enter your registered email"
              />
              <br />
              <br />
              <input type="submit" className="btn-style" value="Submit" />
            </form>
          </>
        )}

        {/* <div className="seperator_line">
          <span className="line"> </span>{" "}
          <span className="margin_right margin_left">Check Email</span>
          <span className="line"> </span>
        </div> */}
      </div>
    </>
  );
};
