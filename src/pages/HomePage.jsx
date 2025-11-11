/**
 * [7단계] pages/HomePage.jsx - 홈 페이지 컴포넌트
 * 
 * 이 페이지는:
 * 1. Top 10 영화 배너를 보여줍니다
 * 2. 인기 영화 목록을 보여줍니다
 * 
 * 실행 순서:
 * - URL이 "/"일 때 router.jsx에서 이 컴포넌트를 보여줍니다
 * 
 * 다음 단계: 
 *   [7-1단계] components/movies/TopBanner.jsx
 *   [7-2단계] components/ui/Grid.jsx
 * 
 * Container: 내용을 중앙에 배치하고 너비를 제한하는 컴포넌트
 * Section: 제목과 설명이 있는 섹션 컴포넌트
 * TopBanner: 상단에 표시되는 영화 배너
 * Grid: 영화 카드들을 그리드 형태로 보여주는 컴포넌트
 */

import { Container, Grid, Section } from "@/components/index.js";
import { TopBanner } from "@/components/movies";
export default function HomePage() {
  return (
    <Container>
      {/* Top 10 섹션 */}
      <Section title="Top 10" titleDescription="오늘 많이 본 영화">
        <TopBanner />
      </Section>

      {/* Popular 섹션 */}
      <Section title="Popular" titleDescription="지금 뜨는 작품">
        <Grid />
      </Section>
    </Container>
  );
}
