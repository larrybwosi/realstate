import { MotionDiv } from "@/components/motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const products = [
  {
    id: 1,
    name: "Lavender Dreams",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214",
  },
  {
    id: 2,
    name: "Citrus Burst",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1602910344008-22f323cc1817",
  },
  {
    id: 3,
    name: "Rose Garden",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1600857454225-9967c3e57a78",
  },
  {
    id: 4,
    name: "Ocean Breeze",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1600857454198-75df8df2f678",
  },
];

export function FeaturedProducts() {
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
            Featured Products
          </h2>
          <p className="text-brown/80 max-w-2xl mx-auto">
            Discover our most loved handcrafted soaps, made with premium natural
            ingredients and essential oils.
          </p>
        </MotionDiv>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="featured-product-card">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full rounded-t-lg"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-brown">
                        {product.name}
                      </h3>
                      <p className="text-sage font-medium">${product.price}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}