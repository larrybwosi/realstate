'use server';

import { sanityFetch } from "@/sanity/lib/live";
import { Apartment, Court } from "@/types";

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

export async function getApartments({
  query,
  sort,
  minPrice,
  maxPrice,
  bedrooms,
  bathrooms,
  page = 1,
}: {
  query?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  page?: number;
}): Promise<{ data: Apartment[]; total: number }> {
  const itemsPerPage = 12; // Number of items per page
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  // Base query
  let groqQuery = `*[_type == "apartment"`;

  // Add search query
  if (query) {
    groqQuery += ` && (title match "${query}*" || description match "${query}*" || court->name match "${query}*")`;
  }

  // Add price filter
  if (minPrice !== undefined || maxPrice !== undefined) {
    groqQuery += ` && rental.price >= ${minPrice || 0} && rental.price <= ${maxPrice || 1000000}`;
  }

  // Add bedrooms filter
  if (bedrooms !== undefined) {
    groqQuery += ` && specifications.bedrooms >= ${bedrooms}`;
  }

  // Add bathrooms filter
  if (bathrooms !== undefined) {
    groqQuery += ` && specifications.bathrooms >= ${bathrooms}`;
  }

  // Close the query
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
    category,
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
      default:
        groqQuery += ` | order(_createdAt desc)`;
        break;
    }
  }

  // Fetch data
  const res = await sanityFetch({ query: groqQuery });

  // Paginate results
  const paginatedResults = res.data?.slice(start, end);

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
