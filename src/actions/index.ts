'use server'
"use cache";

import { sanityFetch } from "@/sanity/lib/live";

export async function getApartments() {
  const res = await sanityFetch({
    query: `*[_type == "apartment"] {
    _id,
    title,
    slug,
    mainImage,
    images,
    price,
    squareFootage,
    bedrooms,
    bathrooms,
    availableDate,
    amenities,
    category,
    featured,
    court->{
      _id,
      name
    },
    floorNumber,
    apartmentNumber,
    rating
  }`,
  });
  return res.data
}

export async function getApartment(slug: string) {
  const res = await sanityFetch({
    query: `*[_type == "apartment" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      images,
      price,
      squareFootage,
      bedrooms,
      bathrooms,
      availableDate,
      amenities,
      description,
      floorPlan,
      virtualTourUrl,
      category,
      featured,
      location,
      parkingSpaces,
      petsAllowed,
      leaseTerms,
      nearbyAttractions,
      court->{
        _id,
        name
      },
      floorNumber,
      apartmentNumber
    }`,
    params: { slug },
  });
  return res.data
}

export async function getSimilarApartments(slug: string, category: string) {
  const res = await sanityFetch({
    query: `*[_type == "apartment" && slug.current != $slug && category == $category][0...3] {
      _id,
      title,
      slug,
      mainImage,
      images,
      price,
      squareFootage,
      bedrooms,
      bathrooms,
      court->{
        _id,
        name
      }
    }`,
    params: { slug, category },
  });
  return res.data
}

export async function getCourts() {
  return await sanityFetch({
    query: `*[_type == "court"] {
    _id,
    name,
    description,
    image,
    totalFloors,
    totalApartments,
    "availableApartments": count(*[_type == "apartment" && references(^._id) && !defined(tenant)])
  }`,
  });
}

export async function getCourtWithApartments(id: string) {
  return await sanityFetch({
    query: `*[_type == "court" && _id == $id][0] {
      _id,
      name,
      description,
      image,
      totalFloors,
      totalApartments,
      "apartments": *[_type == "apartment" && references(^._id)] {
        _id,
        title,
        slug,
        mainImage,
        images,
        price,
        squareFootage,
        bedrooms,
        bathrooms,
        availableDate,
        amenities,
        category,
        featured,
        floorNumber,
        apartmentNumber
      }
    }`,
    params: { id },
  });
}
