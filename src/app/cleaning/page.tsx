import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Room Cleaning",
    description: "Professional deep cleaning for all rooms in your home",
    icon: "🧼",
    price: "$25/room",
    highlight: "Most Popular",
  },
  {
    title: "Laundry Service",
    description: "Wash, dry, and fold with next-day delivery",
    icon: "👔",
    price: "$1.5/lb",
    highlight: "Express Delivery",
  },
  {
    title: "Fence Trimming",
    description: "Yard maintenance and fence restoration",
    icon: "🌿",
    price: "$50/hour",
    highlight: "Seasonal Discount",
  },
  {
    title: "Window Cleaning",
    description: "Streak-free interior and exterior window cleaning",
    icon: "🪟",
    price: "$3/window",
    highlight: "Eco-Friendly",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section with Image */}
      <header className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://i.pinimg.com/736x/a0/ec/c3/a0ecc30d55ca829768473f8be3583bcd.jpg"
            alt="Professional cleaning service"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        </div>

        <div className="relative h-full flex items-center px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            <Badge variant="secondary" className="text-lg py-2 px-4">
              <Sparkles className="mr-2 h-4 w-4" /> Premium Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-2xl">
              Transform Your Space with Our Expert Cleaning
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl">
              Professional cleaning services that bring sparkle to your home and
              peace to your mind
            </p>
            <Button
              size="lg"
              className="text-lg px-8 py-6 hover:scale-105 transition-transform"
            >
              Book Now
            </Button>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive cleaning solutions tailored to your needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card
                key={service.title}
                className="hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{service.icon}</span>
                    {service.highlight && (
                      <Badge
                        variant="outline"
                        className="text-primary border-primary"
                      >
                        {service.highlight}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                  <div className="text-2xl font-bold text-primary">
                    {service.price}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              No hidden fees - just quality service at fair prices
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-background rounded-xl p-8 border hover:border-primary transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <div className="text-4xl font-bold text-primary mb-6">
                  {service.price}
                </div>
                <Button className="w-full">Select Plan</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Gradient */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground">
              We&apos;ll respond within 24 hours
            </p>
          </div>
          <form className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Input
                placeholder="Name"
                className="h-14 text-lg bg-background hover:bg-muted/50 transition-colors"
              />
              <Input
                placeholder="Email"
                type="email"
                className="h-14 text-lg bg-background hover:bg-muted/50 transition-colors"
              />
            </div>
            <Textarea
              placeholder="Your message..."
              rows={5}
              className="text-lg bg-background hover:bg-muted/50 transition-colors"
            />
            <Button
              type="submit"
              className="w-full h-14 text-lg hover:scale-[1.02] transition-transform"
            >
              Send Message
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">CleanCo</h3>
            <p className="text-sm text-muted-foreground">
              Bringing cleanliness to your doorstep since 2024
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Residential Cleaning</li>
              <li>Commercial Cleaning</li>
              <li>Specialty Services</li>
              <li>Emergency Cleaning</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>hello@cleanco.com</li>
              <li>(555) 123-4567</li>
              <li>24/7 Support</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <span className="sr-only">Twitter</span>🐦
              </Button>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Facebook</span>📘
              </Button>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Instagram</span>📸
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
