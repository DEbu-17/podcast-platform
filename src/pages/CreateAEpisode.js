import React, { useState } from "react";
import Header from "../Components/SIgnUpComponents/Header";
import { toast } from "react-toastify";
import FileInput from "../Components/PodcastComponents/FileInput";
import Input from "../Components/SIgnUpComponents/Input";
import Button from "../Components/SIgnUpComponents/Button";
import { useNavigate, useParams } from "react-router-dom";
import {auth, db, storage} from "../FireBaseConfig"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

function CreateAEpisode() {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState();
  const [Loading, setLoading] = useState(false);
  const naviagte = useNavigate();

  const handleAudioFile = (file) => {
    setAudioFile(file);
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
    setLoading(true);
    if ((title && desc && audioFile && id)) {
      try {
        const audioRef = ref(storage,`podcast-episodes/${auth.currentUser.uid}/${Date.now()}`);
        await uploadBytes(audioRef,audioFile);
        
        const audioURL = await getDownloadURL(audioRef);
        const episodeData = {
          title:title,
          description:desc,
          audioFile:audioURL
        };

        await addDoc(collection(db, "podcasts", id, "episodes"),episodeData);
        
        toast.success("Episode Created Successfully");
        setLoading(false);
        naviagte(`/podcast/${id}`);
        setTitle("");
        setDesc("");
        setAudioFile("");
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      toast.error("All files should be there");
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <h2>Create Episode</h2>
      <form className="form">
        <Input
          type="text"
          placeholder="Title"
          state={title}
          setState={setTitle}
        />
        <Input
          type="text"
          placeholder="Description"
          state={desc}
          setState={setDesc}
        />
        <FileInput
          type="file"
          accept="audio/*"
          id="audio-file-input"
          text="Upload Audio File"
          fileHandleFnc={handleAudioFile}
        />
        <Button
          text={Loading ? "Loading..." : "Create Episode"}
          disabled={Loading}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default CreateAEpisode;
