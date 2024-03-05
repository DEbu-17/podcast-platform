import React, { useState } from 'react'
import Input from './Input';
import Button from './Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db,auth,storage } from '../../FireBaseConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doc,getDoc } from 'firebase/firestore';
import { setUser } from '../../Redux-Toolkit/Features/userSlice';
import { toast } from 'react-toastify';
function LoginPage() {

const navigate = useNavigate();
const dispatch = useDispatch();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading,setLoading] = useState(false);

 async function handleLogin(e){
  e.preventDefault();
  setLoading(true);
  if(email && password){
try {
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredentials.user;
  console.log(user);

  const userDoc = await getDoc(doc(db, "users", user.uid));
  const userData = userDoc.data();

  console.log(userData);

  dispatch(
    setUser({
      name: userData.name,
      email: user.email,
      uid: user.uid,
    })
  );
  toast.success("user Logged In Successfully");
  setLoading(false);
  navigate("/Profile");
} catch (error) {
  console.log(error);
  toast.error(error.message);
  setLoading(false);
}
  }else{
    toast.error("Make Sure Email and Password Should Not Be Empty")
    setLoading(false);
  }
  
   }
 

  return (
    <div>
      <h2 className="signup-text">Login</h2>
      <form className="form">
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

        <Button text={loading ? "Loading..." : "Login"} disabled={loading} onClick={handleLogin} />
      </form>
    </div>
  );
  }

export default LoginPage;