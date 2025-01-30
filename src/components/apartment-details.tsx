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
  Construction,
  Home,
  TreePine,
  WashingMachine,
  DoorOpen,
  Container,
  ParkingCircle,
  Square,
  Globe,
  ShieldCheck,
  Package,
  Wind,
} from "lucide-react";
import { Apartment } from "@/types";
import { IconElevator, IconPool, IconWheelchair } from "@tabler/icons-react";
import ApartmentImages from "./apartment-images";

const amenityIcons: Record<string, React.ElementType> = {
  "Air Conditioning": Wind,
  Balcony: Expand,
  Dishwasher: Container,
  Elevator: IconElevator,
  "Fitness Center": Dumbbell,
  Furnished: Home,
  Garage: ParkingCircle,
  Garden: TreePine,
  "Hardwood Floors": Square,
  "In-unit Laundry": WashingMachine,
  Internet: Globe,
  Parking: Car,
  "Pet-friendly": Paw,
  Pool: IconPool,
  "Security System": ShieldCheck,
  Storage: Package,
  "Walk-in Closet": DoorOpen,
  "Washer/Dryer": WashingMachine,
  "Wheelchair Accessible": IconWheelchair,
  "Wi-Fi": Wifi,
};
export function ApartmentDetails({ apartment }: { apartment: Apartment }) {

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Image Section */}
      <ApartmentImages apartment={apartment} />

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
        <div>
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {apartment.amenities?.map((amenity: string) => {
              const IconComponent = amenityIcons[amenity] || Construction;
              return (
                <div
                  key={amenity}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <IconComponent className="h-5 w-5 text-primary" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{amenity}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Location */}
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          Location
        </h2>
        <div className="aspect-16/9 relative mb-6 rounded-lg overflow-hidden shadow-lg">
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
