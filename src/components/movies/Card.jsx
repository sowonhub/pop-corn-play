/**
 * [7-2-2단계] components/movies/Card.jsx - 영화 카드 컴포넌트
 * 
 * 영화 정보를 카드 형태로 보여주는 컴포넌트입니다.
 * 클릭하면 영화 상세 페이지로 이동합니다.
 * 
 * 실행 순서:
 * - Grid 컴포넌트에서 여러 개의 Card를 렌더링합니다
 * 
 * @param {Object} movie - 영화 정보 객체
 *   - id: 영화 ID
 *   - title: 영화 제목
 *   - poster_path: 포스터 이미지 경로
 *   - vote_average: 평점
 */

import { Link } from "react-router-dom";

import { Image } from "@/components/ui";
import { ROUTES } from "@/router";

export default function Card({ movie }) {
  // 영화 제목 (title이 없으면 name 사용, 둘 다 없으면 "Untitled")
  const title = movie?.title || movie?.name || "Untitled";
  
  // 평점을 소수점 1자리로 포맷팅 (없으면 "-")
  const voteAverage = movie.vote_average?.toFixed?.(1) ?? "-";

  return (
    <article className="group overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-900 transition hover:-translate-y-0.5 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50">
      {/* 영화 포스터 이미지 - 클릭하면 상세 페이지로 이동 */}
      <Link to={ROUTES.MOVIE(movie.id)} aria-label={`${title} 상세보기`}>
        <Image
          src={movie?.poster_path}
          type="poster"
          alt={title}
          width={342}
          height={513}
          className="aspect-2/3 w-full object-cover transition group-hover:opacity-95"
        />
      </Link>
      
      {/* 영화 정보 (제목, 평점) */}
      <div className="space-y-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold">{title}</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          ⭐ {voteAverage}
        </p>
      </div>
    </article>
  );
}
