
import { MotionDiv } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSignup() {
  return (
    <section className="py-20 bg-sage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-white/90 mb-8">
            Subscribe to receive updates, exclusive offers, and natural skincare
            tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-white/90 border-0 placeholder:text-brown/60"
            />
            <Button
              type="submit"
              className="bg-brown hover:bg-brown/90 text-white"
            >
              Subscribe
            </Button>
          </form>
          <p className="mt-4 text-sm text-white/80">
            By subscribing, you agree to our Privacy Policy and consent to receive
            updates from our company.
          </p>
        </MotionDiv>
      </div>
    </section>
  );
}