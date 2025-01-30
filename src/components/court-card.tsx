import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Home, MapPin, Star } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { Court } from "@/types";

export function CourtCard({ court }: { court: Court }) {
  
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card shadow-xs transition-all hover:shadow-md dark:border-gray-800">
      <div className="aspect-16/9 relative">
        <Image
          src={urlFor(court.mainImage).width(500).format("webp").url()}
          alt={court.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">
            {court.name}
          </h3>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>4.8</span>
          </Badge>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          {court.description}
        </p>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">
                {court.totalApartments} Units
              </p>
              <p className="text-xs text-muted-foreground">
                {court.availableApartments} Available
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">{court.totalFloors} Floors</p>
              <p className="text-xs text-muted-foreground">
                Modern Architecture
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {court.buildingAmenities?.slice(0, 3).map((amenity) => (
            <Badge
              key={amenity}
              variant="outline"
              className="flex items-center gap-1 text-xs"
            >
              {amenity}
            </Badge>
          ))}
          {court.buildingAmenities && court.buildingAmenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{court.buildingAmenities.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              {court?.address?.city}, {court?.address?.state}
            </span>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href={`/courts/${court?.slug?.current}`}>View Apartments</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
