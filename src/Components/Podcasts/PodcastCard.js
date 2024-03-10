import React from 'react'
import "../../Css files/podcast.css"
import { Link } from 'react-router-dom';
import { doc, deleteDoc, deleteField, updateDoc } from "firebase/firestore";
import {auth, db, storage} from "../../FireBaseConfig"
import { deleteObject, ref } from 'firebase/storage';
import { toast } from 'react-toastify';
import { IoIosCloseCircle } from "react-icons/io";


function PodcastCard({id,title,smallImg}) {
  
console.log(Date.now());
console.log(smallImg);
 const deletePodcast = async () => {
     try{
       toast.success("podcast deleted permanently");
       await deleteDoc(doc(db, "podcasts", id));

       const cityRef = doc(db, "podcasts", id);

       await updateDoc(cityRef, {
         [id]: deleteField(),
       });
       
     }catch(err){
      console.log(err);
     }
  }

  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card">
        <img className="small-img" src={smallImg} />
        <div onClick={deletePodcast} className='close-icon'>
          <IoIosCloseCircle />
        </div>
        <p className="title-podcast">{title}</p>
      </div>
    </Link>
  );
}

export default PodcastCard