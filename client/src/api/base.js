import axios from "axios";

export const socialMedia = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true,
});
