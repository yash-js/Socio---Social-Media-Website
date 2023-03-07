import React, { useState } from "react";
import comment from "../../img/comment.png";
import share from "../../img/share.png";
import like from "../../img/like.png";
import notLike from "../../img/notlike.png";

import "./Post.css";
import { useSelector } from "react-redux";
import { likePost } from "../../api/PostRequest";
const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [liked, setLiked] = useState(data.likes.includes(user._id));

  const [likes, setLikes] = useState(data.likes.length);

  const handleLike = () => {
    setLiked(!liked);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  return (
    <div className="Post">
      <img
        src={data?.image && process.env.REACT_APP_PUBLIC_FOLDER + data.image}
        alt=""
      />
      <div className="postReact">
        <img
          style={{ cursor: "pointer" }}
          src={liked ? like : notLike}
          alt=""
          onClick={handleLike}
        />
        <img src={comment} alt="Comment" />
        <img src={share} alt="Share" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      <div className="detail">
        <span>
          <b>{data?.name}</b>
        </span>
        <span>{data?.desc}</span>
      </div>
    </div>
  );
};

export default Post;
