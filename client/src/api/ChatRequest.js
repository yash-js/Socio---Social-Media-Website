import { socialMedia } from "./base";

export const userChats = (id) => socialMedia.get(`/chat/${id}`);
