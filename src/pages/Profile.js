import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../Components/SIgnUpComponents/Header';
import Button from '../Components/SIgnUpComponents/Button';
import { auth } from '../FireBaseConfig';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';

function Profile() {

 const user = useSelector((state)=>state.user.user);
 console.log(user);

let handleLogout = () => {
  signOut(auth)
    .then(() => {
      toast.success("Logged Out Successfully")
    })
    .catch((error) => {
      toast.error(error.message);
    });
}

 if(!user){
  return <Loader/>
 }

  return (
    <div>
    <Header/>
    {
      user.name && <h1>{user.name}</h1>
    }
    <Button text="Logout" onClick={handleLogout} />
    </div>
  )
}

export default Profile