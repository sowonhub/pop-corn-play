import { tmdbUrl } from "@/api/auth/TMDB.js";

export async function getPopular(page = 1, { signal } = {}) {
  const url = tmdbUrl("/movie/popular", { language: "ko-KR", page });
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`TMDB ${res.status} ${res.statusText}`);
  return res.json();
}
