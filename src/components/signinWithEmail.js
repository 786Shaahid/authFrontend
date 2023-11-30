
export const SignInWithEmail=()=>{
   

    return (
        <>
          <div className="container color_blue">
            <h1>SignIn With Email </h1>
            <form >
                <input type="text" name="email" placeholder="Enter your email"/><br/><br/>
              <input type="submit" className="btn-style" value="Submit" />
            </form>
            <div className="seperator_line">
            <span className="line"> </span> <span className="margin_right margin_left">Check Email</span><span className="line"> </span> 
            </div>
            <form>
                <input type="text" name="otp" placeholder="Enter OTP Number"/><br/><br/>
              <input type="submit" className="btn-style" value="Signin" />
            
            </form>
          </div>
        </>
      );
}