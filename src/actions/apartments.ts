
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { Apartment, Category, Court } from "@/types";
import { groq } from "next-sanity";

export async function getApartment(slug: string):Promise<Apartment> {
  const res = await sanityFetch({
    query: `*[_type == "apartment" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      images,
      amenities,
      description,
      virtualTourUrl,
      featured,
      location,
      petsAllowed,
      leaseTerms,
      nearbyAttractions,
      court->{
        _id,
        name
      },
      floorNumber,
      apartmentNumber,
      category->{
        _id,
        name,
        slug,
        selectOptions
      },
    specifications {
      squareFootage,
      bedrooms,
      bathrooms,
      ceilingHeight,
      exposure
    },
    rental {
      price,
      deposit,
      availableDate,
      minimumLeaseTerm,
      utilities
    },
    }`,
    params: { slug },
  });
  return res.data;
}

export type FilterOptions = {
  query?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  categoryType?: string;
  amenities?: string[];
  exposure?: string;
  status?: string;
  features?: string[];
  page?: number;
  petsAllowed?: boolean;
  furnished?: boolean;
};

export async function getApartments({
  query,
  sort,
  minPrice,
  maxPrice,
  bedrooms,
  bathrooms,
  categoryType,
  amenities,
  exposure,
  status,
  features,
  petsAllowed,
  furnished,
  // page = 1,
}: FilterOptions): Promise<{ data: Apartment[]; total: number }> {
  // const itemsPerPage = 12;
  // const start = (page - 1) * itemsPerPage;
  // const end = start + itemsPerPage;

  // Base query with category join
  let groqQuery = `*[_type == "apartment"`;

  // Add filters
  const filters = [];

  if (query) {
    filters.push(`(
      title match "${query}*" || 
      description match "${query}*" || 
      court->name match "${query}*"
    )`);
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filters.push(
      `rental.price >= ${minPrice || 0} && rental.price <= ${maxPrice || 1000000}`
    );
  }

  if (bedrooms !== undefined) {
    filters.push(`specifications.bedrooms >= ${bedrooms}`);
  }

  if (bathrooms !== undefined) {
    filters.push(`specifications.bathrooms >= ${bathrooms}`);
  }

  if (categoryType) {
    filters.push(`category->type == "${categoryType}"`);
  }

  if (amenities && amenities.length > 0) {
    const amenityFilters = amenities
      .map((a) => `"${a}" in amenities`)
      .join(" && ");
    filters.push(`(${amenityFilters})`);
  }

  if (exposure) {
    filters.push(`specifications.exposure == "${exposure}"`);
  }

  if (status) {
    filters.push(`status == "${status}"`);
  }

  if (features && features.length > 0) {
    const featureFilters = features
      .map((f) => `"${f}" in features`)
      .join(" && ");
    filters.push(`(${featureFilters})`);
  }

  if (petsAllowed !== undefined) {
    filters.push(`policies.petsAllowed == ${petsAllowed}`);
  }

  if (furnished !== undefined) {
    filters.push(`"Furnished" in amenities == ${furnished}`);
  }

  // Add filters to query
  if (filters.length > 0) {
    groqQuery += ` && ${filters.join(" && ")}`;
  }

  // Close the base query
  groqQuery += `] {
    _id,
    _type,
    title,
    slug,
    status,
    description,
    court->{
      _id,
      name,
      totalFloors,
      totalApartments,
      address
    },
    category->{
      _id,
      name,
      type,
      selectOptions,
      icon
    },
    unit {
      floorNumber,
      unitNumber,
      wing
    },
    mainImage,
    images[] {
      asset->,
      alt,
      caption
    },
    specifications {
      squareFootage,
      bedrooms,
      bathrooms,
      ceilingHeight,
      exposure
    },
    rental {
      price,
      deposit,
      availableDate,
      minimumLeaseTerm,
      utilities
    },
    amenities,
    features,
    policies {
      petsAllowed,
      petPolicy,
      smokingAllowed,
      parkingSpaces
    },
    featured,
    rating,
    _createdAt
  }`;

  // Add sorting
  if (sort) {
    switch (sort) {
      case "price-asc":
        groqQuery += ` | order(rental.price asc)`;
        break;
      case "price-desc":
        groqQuery += ` | order(rental.price desc)`;
        break;
      case "rating-desc":
        groqQuery += ` | order(rating desc)`;
        break;
      case "newest":
        groqQuery += ` | order(_createdAt desc)`;
        break;
      case "featured":
        groqQuery += ` | order(featured desc, _createdAt desc)`;
        break;
      default:
        groqQuery += ` | order(_createdAt desc)`;
        break;
    }
  }

  // Fetch data
  const res = await sanityFetch({ query: groqQuery });
  
  // Paginate results
  const paginatedResults = res.data;

  return {
    data: paginatedResults,
    total: res.data?.length,
  };
}

export async function getSimilarApartments(
  slug: string,
  categorySlug: string
): Promise<Apartment[]> {
  
  const res = await sanityFetch({
    // query: `*[_type == "apartment" && slug.current != $slug && category.slug.current == $categorySlug][0...3] {
    query: `*[_type == "apartment" && slug.current != $slug ][0...3] {
      _id,
      _type,
      title,
      slug,
      status,
      category->{
        _id,
        name,
        selectOptions
      },
      court->{
        _id,
        name,
        totalFloors,
        totalApartments,
        address
      },
      unit {
        floorNumber,
        unitNumber,
        wing
      },
      mainImage {
        asset->
      },
      images[] {
        asset->,
        alt,
        caption
      },
      specifications {
        squareFootage,
        bedrooms,
        bathrooms,
        ceilingHeight,
        exposure
      },
      rental {
        price,
        deposit,
        availableDate,
        minimumLeaseTerm,
        utilities
      },
      amenities,
      description,
      features,
      policies {
        petsAllowed,
        petPolicy,
        smokingAllowed,
        parkingSpaces
      },
      location,
      nearbyAttractions[]->{
        _id,
        name,
        image
      },
      rating,
      featured
    }`,
    params: { slug, categorySlug },
  });

  return res.data;
}

export async function getCategories (): Promise<Category[]> {
  const res = await sanityFetch({
    query: `*[_type == "category"]`,
  });
  return res.data;
}
export async function getFeaturedApartments(): Promise<Apartment[] | []> {
  try {
    const query = groq`*[_type == "apartment" && featured == true]`;
    return await client.fetch(query);
  } catch (error) {
    console.warn(error);
    return [];
  }
}

interface CourtWithApartments extends Court {
  apartments: Apartment[]
}
export async function getCourtWithApartments(id: string): Promise<CourtWithApartments> {

  const res = await sanityFetch({
    query: `*[_type == "court" && slug.current == $id][0] {
      _id,
      _type,
      name,
      description,
      mainImage,
      images[] {
        asset->,
        alt,
        caption
      },
      yearBuilt,
      totalFloors,
      totalApartments,
      location,
      address,
      buildingAmenities,
      management {
        companyName,
        contactPerson,
        phone,
        email,
        officeHours
      },
      "apartments": *[_type == "apartment" && references(^._id)] {
        _id,
        title,
        slug,
        mainImage,
        images[] {
          asset->,
          alt,
          caption
        },
        specifications {
          squareFootage,
          bedrooms,
          bathrooms
        },
        rental {
          price,
          availableDate
        },
        unit {
          floorNumber,
          unitNumber
        }
      }
    }`,
    params: { id },
  });

  return res.data;
}


export async function getCourts():Promise<Court[]> {
  const res = await sanityFetch({
    query: `*[_type == "court"] {
      _id,
      _type,
      name,
      description,
      mainImage,
      slug,
      images[] {
        asset->,
        alt,
        caption
      },
      yearBuilt,
      totalFloors,
      totalApartments,
      location,
      address,
      buildingAmenities,
    }`,
  });

  return res?.data
}
