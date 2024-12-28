import { HeroSection } from "./components/hero-section";
import { FeaturedProducts } from "./components/featured-products";
import { WhyChooseUs } from "./components/why-choose-us";
import { BlogPreview } from "./components/blog-preview";
import { Testimonials } from "./components/testimonials";
import { NewsletterSignup } from "./components/newsletter-signup";
import { InstagramFeed } from "./components/instagram-feed";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <BlogPreview />
      <Testimonials />
      <NewsletterSignup />
      <InstagramFeed />
    </div>
  );
}