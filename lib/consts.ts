import { constructAccept } from "@/lib/utils";

export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/webp"];

export const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm"];

export const ACCEPTED_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/ogg",
  "audio/wav",
  "audio/webm",
];

export const Accept_Image = constructAccept(ACCEPTED_IMAGE_TYPES);
