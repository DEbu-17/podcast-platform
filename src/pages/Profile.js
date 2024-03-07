import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Components/SIgnUpComponents/Header";
import Button from "../Components/SIgnUpComponents/Button";
import { auth, db } from "../FireBaseConfig";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import "../Css files/profile.css";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { CgProfile } from "react-icons/cg";


function Profile() {
  const { id } = useParams();
  console.log(id);
  const [userData, setUserData] = useState("");
  const user = useSelector((state) => state.user.user);
  console.log(userData);

  let handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  async function getData() {
    const docRef = doc(db, "podcasts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  if (!user) {
    return <Loader />;
  } else {
    console.log(user.name);
    // getData();

    console.log();
  }

  return (
    <div>
      <Header />
      <h2 className="profile-h2">Profile</h2>
      <div className="profile-wrapper">
        <div className="profile-card">
          <div>
            <img
              className="profile-pic"
              src={require("../Images/profile.jpg")}
            />
          </div>
          <div className="profile-desc">
            <p style={{marginBottom:"-5px"}}>Name: {user.name && user.name}</p>

            <p>
              Email: {user.email && user.email}
            </p>
          </div>
        </div>
      </div>
      <Button
        text="Logout"
        onClick={handleLogout}
        style={{
          width: "10%",
          position: "absolute",
          top: "30px",
          right: "30px",
        }}
      />
    </div>
  );
}

export default Profile;
