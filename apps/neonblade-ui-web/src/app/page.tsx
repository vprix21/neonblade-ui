import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { StatsSection } from "../components/StatsSection";
import { Features } from "../components/Features";
import { CommunityFeedback } from "../components/CommunityFeedback";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white selection:bg-[#00f3ff] selection:text-black">
      <Navbar />
      <Hero />
      <StatsSection />
      <Features />
      <CommunityFeedback />
      <CTA />
      <Footer />
    </main>
  );
}
