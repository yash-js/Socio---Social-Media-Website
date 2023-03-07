import { socialMedia } from "./base";

socialMedia.interceptors.request.use((req) => {
  const data = JSON.parse(localStorage.getItem("profile"));
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${data.token}`;
  }

  return req;
});

export const getUser = (userId) => socialMedia.get(`/user/${userId}`);

export const updateUser = (id, data) => socialMedia.put(`/user/${id}`, data);

export const getAllUser = () => socialMedia.get(`/user`);

export const followUser = (id, data) =>
  socialMedia.put(`/user/${id}/follow`, data);

export const unfollowUser = (id, data) =>
  socialMedia.put(`/user/${id}/unfollow`, data);
