import { ApartmentGrid } from "@/components/apartment-grid";
import { SearchBar } from "./components/search-bar";
import { FilterOptions } from "./components/filter-options";
import { SortOptions } from "./components/sort-options";
import { Pagination } from "./components/pagination";
import { getApartments, getCategories } from "@/actions/apartments";
import { connection } from "next/server";
import { Metadata } from "next";

export const metadata: Metadata ={
  title:'Cheap City | Apartments',
  description:'Find the best apartment with your prefrences',
  twitter: {
    card: 'summary_large_image',
    title: 'Cheap City | Apartments',
    description: 'Find the best apartment with your prefrences',
    images: [
      {
        url: 'https://www.cheapcity.com/images/cheapcity.png',
        width: 800,
        height: 600,
      },
    ]
  }
}

export default async function ApartmentsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { query, sort, minPrice, maxPrice, bedrooms, bathrooms, page, exposure, categoryType, amenities, features, furnished, petsAllowed, status } =
    await searchParams;

    await connection()
  const apartments = await getApartments({
    query: query as string,
    sort: sort as string,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    bedrooms: bedrooms ? Number(bedrooms) : undefined,
    bathrooms: bathrooms ? Number(bathrooms) : undefined,
    page: page ? Number(page) : 1,
    exposure: exposure as string,
    // amenities: amenities as string[],
    // features: features as string[],
    // categoryType: categoryType as string,
    // furnished: furnished === "true",
    // petsAllowed: petsAllowed === "true",
    // status: status as string,
  });

  const categories = await getCategories();
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Find Your Perfect Apartment
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore a wide range of apartments tailored to your needs.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchBar defaultValue={query as string} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <FilterOptions
                defaultValues={{
                  minPrice: minPrice as string,
                  maxPrice: maxPrice as string,
                  bedrooms: bedrooms as string,
                  bathrooms: bathrooms as string,
                }}
                categories={categories}
                amenityOptions={[]}
              />
            </div>
          </div>

          {/* Apartment Grid and Sorting */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {apartments?.data.length} of {apartments.total} apartments
              </p>
              <SortOptions defaultValue={sort as string} />
            </div>

            {/* Apartment Grid */}
            <ApartmentGrid apartments={apartments.data} />

            {/* Pagination */}
            {apartments.total > apartments.data.length && (
              <div className="mt-8">
                <Pagination
                  currentPage={page ? Number(page) : 1}
                  totalPages={Math.ceil(apartments.total / 12)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
