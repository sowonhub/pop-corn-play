import { tmdbUrl } from "./auth/TMDB.js";

export default async function getId(id, { signal } = {}) {
  const url = tmdbUrl(`/movie/${id}`, { language: "ko-KR" });
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`TMDB ${res.status} ${res.statusText}`);
  return res.json();
}
