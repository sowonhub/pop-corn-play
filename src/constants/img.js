export const IMG_BASE = "https://image.tmdb.org/t/p";
export const IMG_SIZE = {
  POSTER: "w500",
  BACKDROP: "w1280",
  ORIGINAL: "original",
};
export const NO_IMAGE = "/no-image.png"; // public/no-image.png 하나 넣어두기

// 유틸(선택): 안전한 이미지 src
export const imgSrc = (path, size = IMG_SIZE.POSTER) =>
  path ? `${IMG_BASE}/${size}${path}` : NO_IMAGE;
