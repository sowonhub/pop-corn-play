import { buildUrl } from "@/constants/api.js";

export async function getMovieById(id, { signal } = {}) {
  const url = buildUrl(`/movie/${id}`, { language: "ko-KR" });
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`TMDB ${res.status} ${res.statusText}`);
  return res.json();
}
