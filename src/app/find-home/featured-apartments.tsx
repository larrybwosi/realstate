import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, DollarSign, Bed, Bath, Home } from "lucide-react";
import { getFeaturedApartments } from "@/actions/services";
import { urlFor } from "@/sanity/lib/image";

export async function FeaturedApartments() {
  const featuredApartments = await getFeaturedApartments();

  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold flex items-center">
        <Star className="w-6 h-6 md:w-8 md:h-8 mr-2 text-yellow-400" />
        Featured Apartments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredApartments.map((apartment) => (
          <Card key={apartment._id} className="flex flex-col overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={urlFor(apartment.mainImage).width(600).height(400).url()}
                  alt={apartment.title || "Featured apartment"}
                  layout="fill"
                  objectFit="cover"
                />
                <Badge className="absolute top-2 right-2">Featured</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="text-xl mb-2">{apartment.title}</CardTitle>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {apartment.price}/month
                </span>
                <span className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  {apartment.bedrooms} bed
                </span>
                <span className="flex items-center">
                  <Bath className="w-4 h-4 mr-1" />
                  {apartment.bathrooms} bath
                </span>
                <span className="flex items-center">
                  <Home className="w-4 h-4 mr-1" />
                  {apartment.squareFootage} sqft
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {apartment.description}
              </p>
            </CardContent>
            <CardFooter className="p-4">
              <Button asChild className="w-full">
                <Link href={`/apartments/${apartment.slug?.current}`}>
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
