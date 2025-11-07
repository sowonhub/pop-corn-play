import Button from "@/components/common/Button.jsx";
import Container from "@/components/common/Container.jsx";
import Skeleton from "@/components/common/Skeleton.jsx";
import { useMovieDetail } from "@/features/movie/hooks/useMovieDetail.js";
import { Link, useParams } from "react-router-dom";

function minToHM(min = 0) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h}시간 ${m}분` : `${m}분`;
}

export default function MovieDetailPage() {
  const { id } = useParams();
  const { data: m, loading, error } = useMovieDetail(Number(id));

  if (loading) {
    return (
      <Container className="py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px,1fr]">
          <Skeleton className="aspect-2/3 w-full" />
          <div className="space-y-3">
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </Container>
    );
  }

  if (error || !m) {
    return (
      <Container className="py-8">
        <div className="rounded-lg border border-red-700 bg-red-900/20 p-4 text-sm text-red-300">
          상세 정보를 불러오는 중 오류가 발생했습니다.
          <div className="mt-3 flex gap-2">
            <Button onClick={() => location.reload()}>새로고침</Button>
            <Link to="/">
              <Button as="a">홈으로</Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  const poster = m.poster_path
    ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
    : "https://placehold.co/500x750?text=No+Image";
  const genres = (m.genres || []).map((g) => g.name).join(" · ");

  return (
    <Container className="py-8">
      <Link to="/" className="text-sm text-neutral-400 hover:text-white">
        ← 홈으로
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-[220px,1fr]">
        <img
          src={poster}
          alt={m.title}
          className="aspect-2/3 w-full rounded-lg object-cover"
        />
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">{m.title}</h1>
          <p className="text-neutral-300">
            {m.overview || "줄거리 정보가 없습니다."}
          </p>

          <ul className="mt-2 text-sm text-neutral-300">
            <li>
              <span className="text-neutral-400">평점</span> · ⭐{" "}
              {m.vote_average?.toFixed?.(1) ?? "-"}
            </li>
            <li>
              <span className="text-neutral-400">개봉</span> ·{" "}
              {m.release_date || "-"}
            </li>
            <li>
              <span className="text-neutral-400">상영시간</span> ·{" "}
              {m.runtime ? minToHM(m.runtime) : "-"}
            </li>
            <li>
              <span className="text-neutral-400">장르</span> · {genres || "-"}
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
