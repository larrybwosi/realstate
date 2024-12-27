import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Expand, Calendar, Building2 } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { MotionDiv } from "./motion";

interface Apartment {
  _id: string;
  title: string;
  slug: { current: string };
  images: { asset: { url: string } }[];
  price: number;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  availableDate: string;
  amenities: string[];
  category: string;
  featured: boolean;
  court: {
    _id: string;
    name: string;
  };
  floorNumber: number;
  apartmentNumber: string;
}

interface ApartmentGridProps {
  apartments: Apartment[];
}

export function ApartmentGrid({ apartments }: ApartmentGridProps) {
  return (
    <section className="py-16">
      <div className="mx-auto w-auto sm:px-2 lg:px-8">
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {apartments.map((apartment) => (
            <MotionDiv
              key={apartment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="aspect-[16/9] relative">
                  <Image
                    src={urlFor(apartment.mainImage.asset)
                      .width(300)
                      .format("webp")
                      .url()}
                    alt={apartment.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  {apartment?.featured && (
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold">{apartment?.title}</h3>
                  <p className="mt-2 text-2xl font-bold text-primary">
                    ${apartment?.price.toLocaleString()}/mo
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Bed className="h-3 w-3" />
                      {apartment?.bedrooms}{" "}
                      {apartment?.bedrooms === 1 ? "Bed" : "Beds"}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Bath className="h-3 w-3" />
                      {apartment?.bathrooms}{" "}
                      {apartment?.bathrooms === 1 ? "Bath" : "Baths"}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Expand className="h-3 w-3" />
                      {apartment?.squareFootage} sqft
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Building2 className="h-3 w-3" />
                      {apartment?.court?.name}
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Available{" "}
                    {new Date(apartment?.availableDate).toLocaleDateString()}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/apartments/${apartment.slug.current}`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
