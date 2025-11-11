import { tmdbUrl } from "@/services/auth/TMDB.js";

export default async function getQuery(query, page = 1, { signal } = {}) {
  const q = String(query ?? "")
    .replace(/^"|"$/g, "")
    .trim();
  if (!q) return { results: [], page: 1, total_results: 0, total_pages: 0 };
  const url = tmdbUrl("/search/movie", {
    query: q,
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
