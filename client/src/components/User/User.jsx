import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";

const User = ({ person }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useSelector((state) => state.authReducer.authData);

  const dispatch = useDispatch();
  const [following, setFollowing] = useState(
    person.follower.includes(user._id)
  );

  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing(!following);
  };

  return (
    <div className="follower">
      <div>
        <img
          className="followerImg"
          src={
            person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + "profileImg.jfif"
          }
          alt=""
        />
        <div className="name">
          <span>
            {person.firstname} {person.lastname}
          </span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={`button fc-button ${following ? " unfollowButton" : ""}`}
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
