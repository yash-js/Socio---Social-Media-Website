import React, { useState, useRef } from "react";
import profileImage from "../../img/profileImg.jfif";
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from "@iconscout/react-unicons";
import "./PostShare.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction";
const PostShare = () => {
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.postReducer.uploading);
  const user = useSelector((state) => state.authReducer.authData.user);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const desc = useRef();
  const imageRef = useRef();

  const OnImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(uploadPost(newPost));

    reset();
  };

  return (
    <>
      <div className="PostShare">
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "profileImg.jfif"
          }
          alt=""
        />

        <div>
          <input
            required
            type="text"
            placeholder="What's Happening?"
            ref={desc}
          />
          <div className="postOptions">
            <div
              style={{ color: "var(--photo)" }}
              onClick={() => imageRef.current.click()}
              className="option"
            >
              <UilScenery />
              Photo
            </div>

            <div style={{ color: "var(--video)" }} className="option">
              <UilPlayCircle />
              Video
            </div>

            <div style={{ color: "var(--location)" }} className="option">
              <UilLocationPoint />
              Location
            </div>

            <div style={{ color: "var(--shedule )" }} className="option">
              <UilSchedule />
              Schedule
            </div>
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="button ps-button"
            >
              {loading ? "Loading..." : "Share"}
            </button>

            <div style={{ display: "none" }}>
              <input
                type="file"
                ref={imageRef}
                name="myImage"
                onChange={OnImageChange}
                accept="image/*"
              />
            </div>
          </div>
          {image && (
            <div className="previewImage">
              <UilTimes onClick={() => setImage(null)} />
              <img src={URL.createObjectURL(image)} alt="" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostShare;
