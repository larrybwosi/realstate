import { MotionDiv } from "@/components/motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Verified Customer",
    content:
      "The quality of these soaps is exceptional. My skin has never felt better, and the scents are divine!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Verified Customer",
    content:
      "I love that these soaps are eco-friendly and sustainable. The packaging is beautiful too!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Verified Customer",
    content:
      "These soaps have transformed my skincare routine. They're gentle yet effective.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-brown mb-4">
            What Our Customers Say
          </h2>
          <p className="text-brown/80 max-w-2xl mx-auto">
            Read about the experiences of our valued customers with Natural Essence
            Soaps.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <MotionDiv
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="testimonial-card"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-brown">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-brown/60">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-gold fill-current"
                  />
                ))}
              </div>
              <p className="text-brown/80">{testimonial.content}</p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}