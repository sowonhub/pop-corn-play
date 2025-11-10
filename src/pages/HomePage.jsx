import { Container, Section } from "@/components";
import { TopBanner } from "@/features/movies";
import { Grid } from "@/features/movies/index";

export default function HomePage() {
  return (
    <Container>
      <Section title="Top 10" titleDescription="오늘 많이 본 영화">
        <TopBanner />
      </Section>

      <Section title="Popular" titleDescription="지금 뜨는 작품">
        <Grid />
      </Section>
    </Container>
  );
}
