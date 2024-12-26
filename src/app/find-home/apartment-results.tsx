import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Bed,
  Bath,
  Square,
  ParkingCircle,
  PawPrint,
} from "lucide-react";
import { getApartments } from "@/actions";
import { urlFor } from "@/sanity/lib/image";

export async function ApartmentResults() {
  const apartments = await getApartments({});

  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold">Search Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {apartments?.map((apartment) => (
          <Card key={apartment._id} className="flex flex-col">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={urlFor(apartment.mainImage).width(600).height(400).url()}
                  alt={apartment.title || "Apartment"}
                  layout="fill"
                  objectFit="cover"
                />
                {apartment.featured && (
                  <Badge className="absolute top-2 right-2">Featured</Badge>
                )}
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
                  <Square className="w-4 h-4 mr-1" />
                  {apartment.squareFootage} sqft
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {apartment.petsAllowed && (
                  <Badge variant="secondary" className="flex items-center">
                    <PawPrint className="w-3 h-3 mr-1" />
                    Pets Allowed
                  </Badge>
                )}
                {apartment.parkingSpaces && apartment.parkingSpaces > 0 && (
                  <Badge variant="secondary" className="flex items-center">
                    <ParkingCircle className="w-3 h-3 mr-1" />
                    Parking
                  </Badge>
                )}
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
