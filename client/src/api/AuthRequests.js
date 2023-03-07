import { socialMedia } from "./base";

export const logIn = (formData) => socialMedia.post("/auth/login", formData);

export const signUp = (formData) => socialMedia.post("/auth/register", formData);
