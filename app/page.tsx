import { DecorLayers } from "@/features/home/components/DecorLayers";
import { Runner } from "@/features/home/components/Runner";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/features/home/components/HeroSection";
import { BlogSection } from "@/features/home/components/BlogSection";
import { HistorySection } from "@/features/home/components/HistorySection";
import { VideosSection } from "@/features/home/components/VideosSection";
import { DevSection } from "@/features/home/components/DevSection";
import { JoinSection } from "@/features/home/components/JoinSection";
import { ArcadeEffects } from "@/features/home/components/ArcadeEffects";

const Home = () => (
  <>
    <DecorLayers />
    <Runner />
    <main>
      <HeroSection />
      <BlogSection />
      <HistorySection />
      <VideosSection />
      <DevSection />
      <JoinSection />
    </main>
    <Footer />
    <ArcadeEffects />
  </>
);

export default Home;
