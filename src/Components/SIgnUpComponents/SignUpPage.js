import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { db, auth, storage } from "../../FireBaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux-Toolkit/Features/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    if (
      password == confirmPassword &&
      password.length >= 5 &&
      fullName &&
      email
    ) {
      try {
        // creating userAccounts
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;
        console.log(user);

        // saving user Details
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
        });

        // save data in the redux
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("user got created successfully");
        setLoading(false);
        navigate("/Profile");
      } catch (error) {
        toast.error(error.message);
        console.log(error);
        setLoading(false);
      }
    } else {
      if (email == "" || fullName == "") {
        toast.error("Email and FullName Should Not be Empty");
      } else if (password.length < 5) {
        toast.error("Password should be greater than 5 digits");
      } else if (password != confirmPassword) {
        toast.error("password and confirm password must match");
      }
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="signup-text">Signup</h2>
      <form className="form">
        <Input
          type="text"
          name="username"
          placeholder="username"
          state={fullName}
          setState={setFullName}
        />
        <Input
          type="email"
          name="email"
          placeholder="email"
          state={email}
          setState={setEmail}
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          state={password}
          setState={setPassword}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="confirm password"
          state={confirmPassword}
          setState={setConfirmPassword}
        />
        <Button
          text={loading ? "Loading..." : "SignUp"}
          disabled={loading}
          onClick={handleSignUp}
        />
      </form>
    </div>
  );
}

export default SignUpPage;
