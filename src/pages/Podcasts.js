import React, { useEffect, useState } from "react";
import Header from "../Components/SIgnUpComponents/Header";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../FireBaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { setPodcasts } from "../Redux-Toolkit/Features/podcastSlice";
import PodcastCard from "../Components/Podcasts/PodcastCard";
import Input from "../Components/SIgnUpComponents/Input";

function Podcasts() {
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const dispatch = useDispatch();
  
  const [search,setSearch] = useState("");

 

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastData = [];
        querySnapshot.forEach((doc) => {
          podcastData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastData));
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
let filteredPodcast = podcasts.filter(
  (item) =>
    item.title &&
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
);
 
  return (
    <div>
      <Header />
      <h2 className="discover">Discover Podcasts</h2>
      <div className="form">
        <Input
          type="text"
          placeholder="search by title"
          state={search}
          setState={setSearch}
        />
      </div>
      {filteredPodcast.length > 0 ? (
        <div className="podcast-flex">
          {filteredPodcast.map((item) => (
            <PodcastCard
              key={item.id}
              id={item.id}
              title={item.title}
              smallImg={item.smallImg}
            />
          ))}
        </div>
      ) : (
        <p style={{textAlign:"center"}}>{search?"Podcast Not Found" : "No Podcast"}</p>
      )}
    </div>
  );
}

export default Podcasts;
