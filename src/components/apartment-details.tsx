import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bed, Bath, Expand, Car, PawPrintIcon as Paw, MapPin, Building2 } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'

export function ApartmentDetails({ apartment }: { apartment: any }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <div className="aspect-[16/9] relative mb-4">
          <Image
            src={urlFor(apartment.mainImage.asset)
              .width(300)
              .format("webp")
              .url()}
            alt={apartment.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {apartment?.images?.slice(1, 5).map((image: any, index: number) => (
            <div key={index} className="aspect-square relative">
              <Image
                src={urlFor(image.asset).width(150).format("webp").url()}
                alt={image.caption}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">{apartment.title}</h1>
        <p className="text-2xl font-bold text-primary mb-4">
          ${apartment.price.toLocaleString()}/mo
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            {apartment.bedrooms} {apartment.bedrooms === 1 ? "Bed" : "Beds"}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            {apartment.bathrooms} {apartment.bathrooms === 1 ? "Bath" : "Baths"}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Expand className="h-4 w-4" />
            {apartment.squareFootage} sqft
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Car className="h-4 w-4" />
            {apartment.parkingSpaces} Parking{" "}
            {apartment.parkingSpaces === 1 ? "Space" : "Spaces"}
          </Badge>
          {apartment.petsAllowed && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Paw className="h-4 w-4" />
              Pet Friendly
            </Badge>
          )}
          <Badge variant="secondary" className="flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            {apartment?.court?.name}
          </Badge>
        </div>
        <p className="mb-4">{apartment.description}</p>
        <h2 className="text-xl font-bold mb-2">Court Information</h2>
        <p className="mb-4">
          This apartment is located in {apartment?.court?.name}. Floor:{" "}
          {apartment.floorNumber}, Apartment Number: {apartment.apartmentNumber}
        </p>
        <h2 className="text-xl font-bold mb-2">Amenities</h2>
        <ul className="list-disc list-inside mb-4">
          {apartment.amenities.map((amenity: string) => (
            <li key={amenity}>{amenity}</li>
          ))}
        </ul>
        <h2 className="text-xl font-bold mb-2">Lease Terms</h2>
        <ul className="list-disc list-inside mb-4">
          {apartment?.leaseTerms?.map((term: string) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
        <h2 className="text-xl font-bold mb-2">Location</h2>
        <p className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5" />
          {apartment?.location?.lat}, {apartment?.location?.lng}
        </p>
        <h2 className="text-xl font-bold mb-2">Nearby Attractions</h2>
        <ul className="list-disc list-inside mb-4">
          {apartment?.nearbyAttractions?.map((attraction: string) => (
            <li key={attraction}>{attraction}</li>
          ))}
        </ul>
        <div className="flex flex-row gap-7">
          <Button size="lg">Schedule a Tour</Button>
          <a href={`/book/${apartment.slug.current}`}>
            <Button size="lg" variant="default">
              Book
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

