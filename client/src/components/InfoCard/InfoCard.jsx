import React, { useEffect, useState } from "react";
import { UilPen } from "@iconscout/react-unicons";
import * as UserApi from "../../api/UserRequest";
import "./InfoCard.css";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { logout } from "../../actions/AuthAction";
const InfoCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profileUser, setProfileUser] = useState({});

  const { user } = useSelector((state) => state.authReducer.authData);

  const dispatch = useDispatch();

  const params = useParams();

  const profileUserId = params.id;

  const fetchProfileUser = async () => {
    if (profileUserId === user._id) {
      setProfileUser(user);
    } else {
      const profileUser = await UserApi.getUser(profileUserId);
      setProfileUser(profileUser);
    }
  };

  const handleLogout = () => dispatch(logout());

  useEffect(() => {
    return fetchProfileUser();
  }, [user]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {profileUserId === user._id && (
          <UilPen
            width={"2rem"}
            height={"1.2rem"}
            style={{
              cursor: "pointer",
            }}
            onClick={() => setModalOpen(true)}
          />
        )}
      </div>

      <div className="info">
        <span>
          <b>Status</b>
        </span>
        <span>{profileUser.relationship ?? ""}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives In</b>
        </span>
        <span>{profileUser.livesIn ?? ""}</span>
      </div>
      <div className="info">
        <span>
          <b>Works At</b>
        </span>
        <span>{profileUser.worksAt ?? ""}</span>
      </div>
      <button className="button logout-button" onClick={handleLogout}>
        Logout
      </button>
      <ProfileModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        data={user}
      />
    </div>
  );
};

export default InfoCard;
