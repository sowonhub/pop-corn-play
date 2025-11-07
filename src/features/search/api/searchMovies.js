import { buildUrl } from "@/constants/api.js";

export async function searchMovies(query, page = 1, { signal } = {}) {
  const url = buildUrl("/search/movie", {
    query,
    page,
    include_adult: false,
    language: "ko-KR",
  });
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`TMDB ${res.status} ${res.statusText}`);
  return res.json();
}
