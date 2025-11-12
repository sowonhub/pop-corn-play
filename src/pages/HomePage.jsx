// [7단계] 홈 페이지 컴포넌트
import { Container, Grid, Section, SectionHeader } from "@/components/index.js";
import { TopBanner } from "@/components/movies";

export default function HomePage() {
  return (
    <Container>
      <Section header={<SectionHeader title="Top 10" description="오늘 많이 본 영화" />}>
        <TopBanner />
      </Section>
      <Section header={<SectionHeader title="Popular" description="지금 뜨는 작품" />}>
        <Grid />
      </Section>
    </Container>
  );
}
