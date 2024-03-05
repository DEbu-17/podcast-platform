import React, { useState } from "react";
import Header from "../Components/SIgnUpComponents/Header";
import SignUpPage from "../Components/SIgnUpComponents/SignUpPage";
import "../Css files/signup.css";
import LoginPage from "../Components/SIgnUpComponents/LoginPage";
function SignUp() {
  const [flag, setFlag] = useState(false);
  return (
    <div>
      <Header />
      {!flag ? <SignUpPage /> : <LoginPage />}
      {!flag ? (
        <p className="clickHere" onClick={() => setFlag(!flag)}>
          Already Have An Account? Click Here To Login.
        </p>
      ) : (
        <p className="clickHere" onClick={() => setFlag(!flag)}>
          Dont Have An Account? Click here To SignUp
        </p>
      )}
    </div>
  );
}

export default SignUp;
