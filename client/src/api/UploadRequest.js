import { socialMedia } from "./base";

export const uploadImage = (data) => socialMedia.post("/upload", data);

export const uploadPost = (data) => socialMedia.post("/post", data);
