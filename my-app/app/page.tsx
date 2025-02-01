import HeroSection from "./components/HeroSection";
import FeaturedListings from "./components/FeaturedListings";
import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <main className="pt-16">
      <HeroSection />
      <FeaturedListings />
    </main>
  );
}
