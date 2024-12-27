import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const services = [
  {
    title: "Deep House Cleaning",
    description:
      "Thorough cleaning of every corner, including hard-to-reach areas, baseboards, and windows.",
    image:
      "https://cdn.sanity.io/images/k1f8kx4i/production/852cf7905a54dcbbdfbc333fbff9fa6aaff9a5cc-1026x1026.png?w=400&h=400&fit=crop&fm=webp",
  },
  {
    title: "Premium Laundry Care",
    description:
      "Expert handling of delicate fabrics, stain removal, and precise folding techniques.",
    image:
      "https://images.pexels.com/photos/8774643/pexels-photo-8774643.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    title: "Professional Lawn Care",
    description:
      "Complete landscape maintenance including mowing, edging, and garden bed care.",
    image:
      "https://images.pexels.com/photos/4162011/pexels-photo-4162011.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, NY",
    comment: "The attention to detail is remarkable. My home has never felt cleaner!",
    avatar: "https://images.pexels.com/photos/6195106/pexels-photo-6195106.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    name: "Michael Chen",
    location: "San Francisco, CA",
    comment: "Consistent quality and professional service every single time.",
    avatar: "https://images.pexels.com/photos/4108783/pexels-photo-4108783.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    name: "Emma Williams",
    location: "Chicago, IL",
    comment: "Their eco-friendly approach and excellent results keep me coming back.",
    avatar: "https://images.pexels.com/photos/6195206/pexels-photo-6195206.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
]


export default async function CleaningServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-100 to-gray-50">
      {" "}
      <div className="container mx-auto py-16 space-y-20">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 rounded-3xl -z-10" />{" "}
          <div className="grid lg:grid-cols-2 gap-12 items-center lg:p-8 rounded-3xl">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                Transform Your Space with Professional Cleaning
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed dark:text-gray-500">
                Experience the difference with our premium cleaning services. We
                bring expertise, attention to detail, and eco-friendly solutions
                to every home we service.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                {" "}
                {/* Centered on small screens, aligned left on large screens */}
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Free Quote
                </Button>
                <Link href="/services">
                  {" "}
                  <Button size="lg" variant="outline">
                    View Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://cdn.sanity.io/images/k1f8kx4i/production/12b6f27050844bccdc50afc58e520175e7fd40a6-1344x899.png?fm=webp"
                alt="Professional cleaning service"
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-200">
              Our Premium Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto dark:text-gray-200">
              Comprehensive cleaning solutions tailored to your needs
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                  <Link href={`/services/${service.title.toLowerCase()}`}>
                    {" "}
                    {/* Dynamic link to individual service page */}
                    <Button variant="link" className="p-0">
                      Learn More →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-primary/5 rounded-3xl p-8 lg:p-12 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-200">
              Customer Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-200">
              Hear what our satisfied clients have to say
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/50 backdrop-blur">
                <CardContent className="p-2 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <p className="italic text-gray-600">{testimonial.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground rounded-3xl p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready for a Cleaner Space?
            </h2>
            <p className="text-xl opacity-90">
              Book your cleaning service today and enjoy a spotless, healthy
              living environment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={"/cleaning-services/book"}>
                <Button size="lg" variant="secondary">
                  Schedule Now
                </Button>
              </Link>
              <Link href={"#"}>
                <Button size="lg" variant="outline" className="bg-transparent">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

