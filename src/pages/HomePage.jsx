import Container from "@/components/common/Container.jsx";
import Section from "@/components/common/Section.jsx";
import { Top10HeroBanner } from "@/features/home/components";
import MovieGrid from "@/features/movie/components/MovieGrid.jsx";

export default function HomePage() {
  return (
    <Container>
      <Top10HeroBanner />
      <Section title="Popular Movies">
        <MovieGrid />
      </Section>
    </Container>
  );
}
