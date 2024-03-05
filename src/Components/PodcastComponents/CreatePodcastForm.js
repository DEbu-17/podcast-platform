import React, { useState } from "react";
import "../../Css files/createPodcast.css";
import Input from "../SIgnUpComponents/Input";
import Button from "../SIgnUpComponents/Button";
import FileInput from "./FileInput";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../FireBaseConfig";
import { addDoc, collection } from "firebase/firestore";

function CreatePodcastForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [smallImg, setSmallImg] = useState("");
  const [bannerImg, setBannerImg] = useState("");
  const [Loading, setLoading] = useState(false);

  function handleBannerImg(file) {
    setBannerImg(file);
  }

  function handleSmallImg(file) {
    setSmallImg(file);
  }

  async function handleSubmit(e) {
     e.preventDefault();
    if (title && desc && smallImg && bannerImg) {
      e.preventDefault();
      setLoading(true);
      // upload files and get downloadable links
      try {
        // banner Image

        const bannerImgRef = ref(
          storage,
          `podcast/${auth.currentUser.uid}/${Date.now()}`
        );

        // image uploaded in the storage

        await uploadBytes(bannerImgRef, bannerImg);
        const bannerImgUrl = await getDownloadURL(bannerImgRef);

        // small Image

        const smallImgRef = ref(
          storage,
          `podcast/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(smallImgRef, smallImg);
        const smallImgUrl = await getDownloadURL(smallImgRef);

        const podcastData = {
          title: title,
          descriptiion: desc,
          bannerImg: bannerImgUrl,
          smallImg: smallImgUrl,
          createdBy: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "podcasts"), podcastData);
        setTitle("");
        setDesc("");
        setBannerImg(null);
        setSmallImg(null);

        toast.success("Podcast Created Successfully");
        setLoading(false);

      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      toast.error("Enter All Fields");
      setLoading(false);
    }
  }
  return (
    <div>
      <h2>Create A Podcast</h2>
      <form>
        <Input
          type="text"
          name="title"
          placeholder="Podcast Title"
          state={title}
          setState={setTitle}
        />
        <Input
          type="text"
          name="desc"
          placeholder="Podcast Description"
          state={desc}
          setState={setDesc}
        />
        <FileInput
          type="file"
          accept="image/*"
          id="banner-Img-Input"
          text="Upload Banner Image"
          fileHandleFnc={handleBannerImg}
        />

        <FileInput
          type="file"
          accept="image/*"
          id="small-Img-Input"
          text="Upload small Image"
          fileHandleFnc={handleSmallImg}
        />
        <Button
          text={Loading ? "Loading..." : "Create Podcast"}
          disabled={Loading}
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default CreatePodcastForm;
