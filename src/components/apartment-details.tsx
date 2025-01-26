import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bed,
  Bath,
  Expand,
  Car,
  PawPrintIcon as Paw,
  Building2,
  Star,
  Wifi,
  Dumbbell,
  ShoppingCart,
  School,
  Hotel,
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { Apartment } from "@/types";
import { IconPool } from "@tabler/icons-react";

export function ApartmentDetails({ apartment }: { apartment: Apartment }) {
  // Use the apartment's location if available, otherwise fallback to mock location
  // const location = apartment.location
  //   ? apartment.location
  //   : { lat: "40.716452", lng: "-73.781798" };


  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Image Section */}
      <div>
        <div className="aspect-[16/9] relative mb-4 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Image
            src={urlFor(apartment.mainImage.asset)
              .width(600)
              .format("webp")
              .url()}
            alt={apartment.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {apartment?.images?.map((image, index: number) => (
            <div
              key={index}
              className="aspect-square relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={urlFor(image.asset).width(300).format("webp").url()}
                alt={image.asset.caption}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {apartment.title}
        </h1>
        <p className="text-2xl font-bold text-primary mb-4">
          ${apartment?.rental?.price.toLocaleString()}/mo
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge
            variant="secondary"
            className="flex items-center gap-1 dark:bg-gray-700 dark:text-gray-200"
          >
            <Bed className="h-4 w-4" />
            {apartment?.specifications?.bedrooms}{" "}
            {apartment?.specifications?.bedrooms === 1 ? "Bed" : "Beds"}
          </Badge>
          <Badge
            variant="secondary"
            className="flex items-center gap-1 dark:bg-gray-700 dark:text-gray-200"
          >
            <Bath className="h-4 w-4" />
            {apartment?.specifications?.bathrooms}{" "}
            {apartment?.specifications?.bathrooms === 1 ? "Bath" : "Baths"}
          </Badge>
          <Badge
            variant="secondary"
            className="flex items-center gap-1 dark:bg-gray-700 dark:text-gray-200"
          >
            <Expand className="h-4 w-4" />
            {apartment?.specifications?.squareFootage} sqft
          </Badge>
          <Badge
            variant="secondary"
            className="flex items-center gap-1 dark:bg-gray-700 dark:text-gray-200"
          >
            <Car className="h-4 w-4" />
            {apartment.policies?.parkingSpaces} Parking{" "}
            {apartment.policies?.parkingSpaces === 1 ? "Space" : "Spaces"}
          </Badge>
          {apartment.policies?.petsAllowed && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 dark:bg-gray-700 dark:text-gray-200"
            >
              <Paw className="h-4 w-4" />
              Pet Friendly
            </Badge>
          )}
          <Badge
            variant="secondary"
            className="flex items-center gap-1 dark:bg-gray-700 dark:text-gray-200"
          >
            <Building2 className="h-4 w-4" />
            {apartment?.court?.name}
          </Badge>
          {apartment.rating && (
            <Badge
              variant="secondary"
              className="flex items-center gap-1 dark:bg-gray-700 dark:text-gray-200"
            >
              <Star className="h-4 w-4" />
              {apartment.rating} / 5
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          {apartment.description}
        </p>

        {/* Category */}
        {apartment.category && (
          <>
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              Category
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              {apartment.category.name}
            </p>
          </>
        )}

        {/* Court Information */}
        {apartment.court && (
          <>
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              Court Information
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              This apartment is located in {apartment?.court?.name}. Floor:{" "}
              {apartment.unit?.floorNumber}, Apartment Number:{" "}
              {apartment.unit?.unitNumber}
            </p>
          </>
        )}

        {/* Amenities */}
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Amenities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {apartment.amenities?.map((amenity: string) => (
            <div
              key={amenity}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200"
            >
              {amenity === "Wi-Fi" && <Wifi className="h-4 w-4" />}
              {amenity === "Pool" && <IconPool className="h-4 w-4" />}
              {amenity === "Gym" && <Dumbbell className="h-4 w-4" />}
              {amenity === "Shopping" && <ShoppingCart className="h-4 w-4" />}
              {amenity === "School" && <School className="h-4 w-4" />}
              {amenity === "Restaurant" && <Hotel className="h-4 w-4" />}
              <span>{amenity}</span>
            </div>
          ))}
        </div>

        {/* Location */}
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Location
        </h2>
        <div className="aspect-[16/9] relative mb-6 rounded-lg overflow-hidden shadow-lg">
          <iframe
          // 40.678680, -73.947036
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d162936.64871471454!2d-74.09311810728148!3d40.63903948764293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1737635680665!5m2!1sen!2sus`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        {/* Nearby Attractions */}
        {apartment.nearbyAttractions &&
          apartment.nearbyAttractions.length > 0 && (
            <>
              <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                Nearby Attractions
              </h2>
              <ul className="list-disc list-inside mb-6 text-gray-700 dark:text-gray-300">
                {apartment.nearbyAttractions.map((attraction) => (
                  <li key={attraction._id}>{attraction.name}</li>
                ))}
              </ul>
            </>
          )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className=" bg-primary hover:bg-primary/90">
            Schedule a Tour
          </Button>
          <a href={`/book/${apartment.slug.current}`} className="flex-1">
            <Button
              size="lg"
              variant="outline"
              className="w-full dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Book Now
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
