import React, { useState } from "react";
import "./RightSide.css";
import home from "../../img/home.png";
import noti from "../../img/noti.png";
import comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import "./RightSide.css";
import TrenCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";

const RightSide = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to="../home">
          <img src={home} alt="" />
        </Link>
        <UilSetting />
        <img src={noti} alt="" />
        <Link to="../chat">
          <img src={comment} alt="" />
        </Link>
      </div>

      <TrenCard />
      <button className="button r-button " onClick={() => setModalOpen(true)}>
        Share
      </button>
      <ShareModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default RightSide;
