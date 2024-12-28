import { MotionDiv } from "@/components/motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative h-screen">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video"
        poster="https://images.unsplash.com/photo-1612817288484-6f916006741a"
      >
        <source
          src="https://player.vimeo.com/external/373797931.sd.mp4?s=38b8f6ef7e7e928a1c3d4a28a8b0fb61d4f1b398&profile_id=164&oauth2_token_id=57447761"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Handcrafted Soaps for Natural Living
          </h1>
          <p className="text-lg md:text-xl mb-8 text-cream/90">
            Experience the luxury of natural, eco-friendly soaps made with
            sustainable ingredients and traditional craftsmanship.
          </p>
          <div className="space-x-4">
            <Button
              size="lg"
              className="bg-sage hover:bg-sage/90 text-white"
            >
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cream text-cream hover:bg-cream hover:text-sage"
            >
              Learn More
            </Button>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}