import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import "./Css files/App.css";
import Profile from "./pages/Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { db,auth } from "./FireBaseConfig";
import { doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "./Redux-Toolkit/Features/userSlice";
import PrivateRoute from "./Components/SIgnUpComponents/PrivateRoute";
import CreateAPodcast from "./pages/CreateAPodcast";
import Podcasts from "./pages/Podcasts";
import PodcastDetailPage from "./pages/PodcastDetailPage";
import CreateAEpisode from "./pages/CreateAEpisode";

function App() {

const dispatch = useDispatch();

 useEffect(()=>{
  const unsubscribeAuth = onAuthStateChanged(auth,(user)=>{
    if(user){
      const unsubscribeSnapshot = onSnapshot(
        doc(db,"users",user.uid),
        (userDoc)=>{
          if(userDoc.exists){
            const userData = userDoc.data();
            dispatch(setUser({
              name:userData.name,
              email:userData.email,
              uid:user.uid
            }))
          }
        },(error) =>{
          console.log(error);
        }
      )
      return () => {
        unsubscribeSnapshot();
      } 
    }

  })
  return () => {
    unsubscribeAuth();
  }
 })

  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route element={<PrivateRoute/>}>
            <Route path="/Profile" element={<Profile />} />
            <Route path="/CreateAPodcast" element={<CreateAPodcast/>}/>
            <Route path="/Podcasts" element={<Podcasts/>}/>
            <Route path="/Podcast/:id" element={<PodcastDetailPage/>}/>
            <Route path="/Podcast/:id/create-episode" element={<CreateAEpisode/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
