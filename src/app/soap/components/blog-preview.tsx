import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/motion";

const posts = [
  {
    id: 1,
    title: "The Benefits of Natural Soap",
    excerpt:
      "Discover why natural soap is better for your skin and the environment...",
    image: "https://images.unsplash.com/photo-1600857068560-298c40b897b1",
    date: "Mar 15, 2024",
  },
  {
    id: 2,
    title: "Essential Oils Guide",
    excerpt:
      "Learn about different essential oils and their therapeutic properties...",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108",
    date: "Mar 10, 2024",
  },
  {
    id: 3,
    title: "Sustainable Beauty",
    excerpt:
      "Tips for maintaining a sustainable beauty routine that's good for you...",
    image: "https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1",
    date: "Mar 5, 2024",
  },
];

export function BlogPreview() {
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
          <h2 className="text-3xl font-bold text-brown mb-4">Latest Articles</h2>
          <p className="text-brown/80 max-w-2xl mx-auto">
            Stay informed about natural skincare, sustainability, and our
            artisanal soap-making process.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <MotionDiv
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="p-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-sm text-sage mb-2">{post.date}</div>
                  <h3 className="text-xl font-semibold text-brown mb-2">
                    {post.title}
                  </h3>
                  <p className="text-brown/80 mb-4">{post.excerpt}</p>
                  <Button
                    variant="link"
                    className="text-sage hover:text-sage/80 p-0"
                  >
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}