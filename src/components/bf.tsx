"use client";
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
  Wifi,
  Dumbbell,
  Wind,
  Home,
  ParkingCircle,
  TreePine,
  Square,
  Globe,
  ShieldCheck,
  Package,
  DoorOpen,
  Construction,
  Container,
  WashingMachine,
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { Apartment } from "@/types";
import { IconElevator, IconPool, IconWheelchair } from "@tabler/icons-react";
import { useState } from "react";

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
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-[16/9] relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={
                selectedImage === 0
                  ? urlFor(apartment.mainImage.asset)
                      .width(800)
                      .format("webp")
                      .url()
                  : urlFor(apartment?.images[selectedImage - 1].asset)
                      .width(800)
                      .format("webp")
                      .url()
              }
              alt={apartment.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div
              className={`aspect-square relative rounded-lg overflow-hidden cursor-pointer ${
                selectedImage === 0 ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedImage(0)}
            >
              <Image
                src={urlFor(apartment.mainImage.asset)
                  .width(200)
                  .format("webp")
                  .url()}
                alt={apartment.title}
                fill
                className="object-cover hover:opacity-90 transition-opacity"
              />
            </div>
            {apartment?.images?.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className={`aspect-square relative rounded-lg overflow-hidden cursor-pointer ${
                  selectedImage === index + 1 ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedImage(index + 1)}
              >
                <Image
                  src={urlFor(image.asset).width(200).format("webp").url()}
                  alt={image.asset.caption}
                  fill
                  className="object-cover hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {apartment.title}
            </h1>
            <p className="text-2xl font-bold text-primary mt-2">
              ${apartment?.rental?.price.toLocaleString()}/mo
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                icon: Bed,
                value: `${apartment?.specifications?.bedrooms} ${apartment?.specifications?.bedrooms === 1 ? "Bed" : "Beds"}`,
              },
              {
                icon: Bath,
                value: `${apartment?.specifications?.bathrooms} ${apartment?.specifications?.bathrooms === 1 ? "Bath" : "Baths"}`,
              },
              {
                icon: Expand,
                value: `${apartment?.specifications?.squareFootage} sqft`,
              },
              { icon: Building2, value: apartment?.court?.name },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-3 text-center"
              >
                <item.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium text-gray-900">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-700 leading-relaxed">
              {apartment.description}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-bold mb-3 text-gray-900">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {apartment.amenities?.map((amenity: string) => {
                const IconComponent = amenityIcons[amenity] || Construction;
                return (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <IconComponent className="h-5 w-5 text-primary" />
                    <span className="text-gray-700 text-sm">{amenity}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Location */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d162936.64871471454!2d-74.09311810728148!3d40.63903948764293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1737635680665!5m2!1sen!2sus`}
              className="w-full h-[300px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 flex-1">
              Schedule a Tour
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-primary/10"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApartmentDetails;
