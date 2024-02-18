import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  sendMail, sendOtpEmail } from "../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";

export const SignInWithEmail = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();
  let isMailSend = useSelector((state) => state.authReducer.isMailSend);
  const error = useSelector(state => state.authReducer.error);
  const accessToken = useSelector(state => state.authReducer.accessToken);
  const refreshToken = useSelector(state => state.authReducer.refreshToken);

  // handle submit send email
  const handleEmailMessage = (e) => {
    e.preventDefault();
    dispatch(sendMail({ email: inputEmail }));
    setInputEmail("");
  };
  // handle sending otp
  const handleOTP =async (e) => {
    try {
      e.preventDefault();
      const result = await dispatch(sendOtpEmail({otp:otp}));
      if (result.payload.success) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setOtp("");
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const handleOTP = () => {
  //   dispatch(sendOtpEmail({ otp: otp }));
  //   dispatch(userAtions.isEmailSend(isMailSend));
  //   navigate('/');
  // };


  return (
    <>
    <div className={`container color_blue ${error ? "disabled" : ''}`}>
        {isMailSend ? (
          <>
            <h1>Enter OTP for login </h1>
            <form onSubmit={handleOTP}>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP Number"
                value={otp}
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
       
      </div>
    </>
  );
};
