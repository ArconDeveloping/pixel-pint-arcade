import { DecorLayers } from "@/components/decor/DecorLayers";
import { Runner } from "@/components/decor/Runner";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { HistorySection } from "@/components/sections/HistorySection";
import { VideosSection } from "@/components/sections/VideosSection";
import { DevSection } from "@/components/sections/DevSection";
import { JoinSection } from "@/components/sections/JoinSection";
import { ArcadeEffects } from "@/components/effects/ArcadeEffects";

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
