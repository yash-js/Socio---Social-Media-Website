import React, { useState } from "react";
import logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.css";
import { logIn, signUp } from "../../actions/AuthAction";

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const [isSignup, setSignup] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [samePassword, setSamePassword] = useState(true);

  const handleChange = (e) => {
    if (e.target.name === "password" || e.target.name === "confirmPassword")
      setSamePassword(true);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup)
      return data.password === data.confirmPassword
        ? dispatch(signUp(data))
        : setSamePassword(false);
    dispatch(logIn(data));
  };

  const resetForm = () => {
    setSamePassword(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="Auth">
      {/* Left Side */}
      <div className="a-left">
        <img src={logo} alt="" />
        <div className="Webname">
          <h1>SOCIO</h1>
          <h6>Explore the ideas throught the world</h6>
        </div>
      </div>

      {/* Right Side */}
      <div className="a-right">
        <form
          onChange={handleChange}
          onSubmit={handleSubmit}
          className="infoForm authForm"
        >
          <h3>{isSignup ? "Signup" : "Login"}</h3>
          {isSignup && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                autoComplete="off"
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                autoComplete="off"
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              autoComplete="off"
              value={data.username}
            />{" "}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              autoComplete="off"
              value={data.password}
            />
            {isSignup && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmPassword"
                autoComplete="off"
                value={data.confirmPassword}
              />
            )}
          </div>
          {isSignup && (
            <span
              style={{
                display: samePassword ? "none" : "block",
                color: "red",
                fontSize: "12px",
                alignSelf: "flex-end",
                marginRight: "5px",
              }}
            >
              *Password and Confirm Password are not same
            </span>
          )}
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setSignup(!isSignup);
                resetForm();
              }}
            >
              {isSignup
                ? "Already have an account? Login!"
                : "Don't have an account? Signup!"}
            </span>
          </div>
          <button
            disabled={loading}
            className="button infoButton"
            type="submit"
          >
            {loading ? "Loading..." : isSignup ? "Signup" : "Login"}
          </button>{" "}
        </form>
      </div>
    </div>
  );
};

export default Auth;
