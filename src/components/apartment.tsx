import { Bath, Bed, Expand, MapPin, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/moving-border";
import Link from "next/link";
import { Apartment } from "@/types";
import { urlFor } from "@/sanity/lib/image";

export default function ApartmentCard ({apartment}: {apartment: Apartment}) {
  return (
    <Card
      key={apartment._id}
      className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      <div className="aspect-[16/9] relative">
        <Image
          src={urlFor(apartment.mainImage).width(500).format("webp").url()}
          alt={apartment.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-background/80 rounded-full p-2 flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium">
            {apartment.rating || "4.5"}
          </span>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{apartment.title}</h3>
        <p className="text-2xl font-bold text-primary mb-4">
          ${apartment.rental.price.toLocaleString()}/mo
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4" />
          <span>{"New York, NY"}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Bed className="h-3 w-3" />
            {apartment.specifications?.bedrooms} {apartment.specifications?.bedrooms === 1 ? "Bed" : "Beds"}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Bath className="h-3 w-3" />
            {apartment.specifications?.bathrooms} {apartment.specifications?.bathrooms === 1 ? "Bath" : "Baths"}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Expand className="h-3 w-3" />
            {apartment.specifications?.squareFootage} sqft
          </Badge>
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
  );
}