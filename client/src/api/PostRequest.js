import { socialMedia } from "./base";

export const getTimelinePosts = (id) => socialMedia.get(`/post/${id}/timeline`);

export const likePost = (id, userId) =>
  socialMedia.put(`/post/${id}/like`, { userId });
