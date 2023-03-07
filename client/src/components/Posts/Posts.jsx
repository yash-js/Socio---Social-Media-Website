import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import "./Posts.css";
import { getTimelinePosts } from "../../actions/postAction";

const Posts = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  
  if (!posts) return "No Posts";
  if (param.id) posts = posts.filter((post) => post.userId === param.id);
  return (
    <div className="Posts">
      {loading
        ? "Fetching posts...."
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
};

export default Posts;
