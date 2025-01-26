import { Suspense } from "react";
import { ApartmentSearch } from "./apartment-search";
import FeaturedApartments from "./featured-apartments";
import { RecommendedCourts } from "./recommended-courts";
import { ApartmentResults } from "./apartment-results";
import { Skeleton } from "@/components/ui/skeleton";
import { getFeaturedApartments } from "@/actions/services";
import { getApartments, getCourts } from "@/actions/apartments";

type SearchParams = {
  query?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  bathrooms?: string;
  page?: string;
}
export default async function FindApartmentPage({
  searchParams}: {
    searchParams: Promise<SearchParams>;
  }) {
  const { query, sort, minPrice, maxPrice, bedrooms, bathrooms, page } =
    await searchParams;
  const featuredApartments = await getFeaturedApartments();
  const recommendedCourts = await getCourts();
  const apartments = await getApartments({
    query: query as string,
    sort: sort as string,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    bedrooms: bedrooms ? Number(bedrooms) : undefined,
    bathrooms: bathrooms ? Number(bathrooms) : undefined,
    page: page ? Number(page) : 1,
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Find Your Perfect Apartment
      </h1>
      <ApartmentSearch />
      <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
        <FeaturedApartments featuredApartments={featuredApartments} />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
        <RecommendedCourts recommendedCourts={recommendedCourts} />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
        <ApartmentResults apartments={apartments?.data} />
      </Suspense>
    </div>
  );
}
