import { Suspense } from "react";
import { ApartmentSearch } from "./apartment-search";
import { FeaturedApartments } from "./featured-apartments";
import { RecommendedCourts } from "./recommended-courts";
import { ApartmentResults } from "./apartment-results";
import { Skeleton } from "@/components/ui/skeleton";

export default function FindApartmentPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Find Your Perfect Apartment
      </h1>
      <ApartmentSearch />
      <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
        <FeaturedApartments />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
        <RecommendedCourts />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
        <ApartmentResults />
      </Suspense>
    </div>
  );
}
