import React, { useEffect, useState } from "react";
import Header from "../Components/SIgnUpComponents/Header";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../FireBaseConfig";
import { toast } from "react-toastify";
import Button from "../Components/SIgnUpComponents/Button";
import EpisodeDetails from "../Components/EpisodeDetails";
import AudioPlayer from "../Components/AudioPlayer";



function PodcastDetailPage() {
  const { id } = useParams();
  console.log(id);
  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const navigate = useNavigate();
  const [playingFile,setplayingFile] = useState("");
 
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
       
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        toast.error("No such document!");
        navigate("/Podcasts");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <div>
      <Header />
      <div className="form">
        {podcast.id && (
          <>
            <h2 className="podcast-title-heading">{podcast.title}</h2>
            <Button
              text="create Episode"
              style={{
                width: "200px",
                position: "absolute",
                top: "60px",
                right: "155px",
              }}
              onClick={() => navigate(`/podcast/${id}/create-episode`)}
            />
            <div className="banner-wrapper">
              <img src={podcast.bannerImg} />
            </div>
            <p className="podcast-description">{podcast.descriptiion}</p>
            <h2 style={{ marginTop: "0", marginLeft: "-1115px" }}>Episodes</h2>
            {episodes.length > 0 ? (
              <ol>
                {episodes.map((episodes, index) => (
                  <EpisodeDetails
                    key={index}
                    index={index + 1}
                    title={episodes.title}
                    description={episodes.description}
                    audioFile={episodes.audioFile}
                    onClick={(file) => setplayingFile(file)}
                  />
                ))}
              </ol>
            ) : (
              <p>No Episodes</p>
            )}
          </>
        )}
      </div>
      {playingFile && <AudioPlayer audioSrc={playingFile} image={podcast.smallImg} />}
    </div>
  );
}

export default PodcastDetailPage;
