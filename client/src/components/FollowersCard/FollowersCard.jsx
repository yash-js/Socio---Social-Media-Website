import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import "../../App.css";
import { Followers } from "../../Data/FollowersData";
import User from "../User/User";
import { useSelector } from "react-redux";
import { getAllUser } from "../../api/UserRequest";
const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const fetchPersons = async () => {
    const { data } = await getAllUser();
    setPersons(data);
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>

      {persons
        .filter((person) => person._id !== user._id)
        .map((person, index) => {
          return <User key={index} person={person} />;
        })}
    </div>
  );
};

export default FollowersCard;
