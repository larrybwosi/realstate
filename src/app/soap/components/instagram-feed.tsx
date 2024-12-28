import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/motion";

const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1602910344008-22f323cc1817",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600857454225-9967c3e57a78",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1600857454198-75df8df2f678",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1",
  },
];

export function InstagramFeed() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-brown mb-4">
            Follow Us on Instagram
          </h2>
          <p className="text-brown/80 max-w-2xl mx-auto">
            Join our community and stay updated with our latest creations and
            behind-the-scenes moments.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <MotionDiv
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="instagram-feed-item group"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
            </MotionDiv>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-sage text-sage hover:bg-sage hover:text-white"
          >
            <Instagram className="w-4 h-4 mr-2" />
            Follow @naturalessence
          </Button>
        </div>
      </div>
    </section>
  );
}