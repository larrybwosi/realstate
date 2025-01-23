import { createClient, groq } from "next-sanity";
import { apiVersion, dataset, projectId, } from "@/sanity/env";
import { Apartment } from "@/types";

const client = createClient({
  apiVersion,
  dataset,
  projectId,
  // useCdn: ,
});

// Helper function to handle errors
const handleSanityError = (error: any) => {
  console.error("Sanity query error:", error);
  throw new Error("Failed to fetch data from Sanity."); 
};

export async function getFeaturedApartments(): Promise<Apartment[] | []> {
  try {
    const query = groq`*[_type == "apartment" && featured == true]`;
    return await client.fetch(query);
  } catch (error) {
    handleSanityError(error);
    return [];
  }
}

export async function getApartment(slug: string) {
  try {
    const query = groq`*[_type == "apartment" && slug.current == $slug][0]`;
    return await client.fetch(query, { slug });
  } catch (error) {
    handleSanityError(error);
  }
}

export async function getApartments() {
  try {
    const query = groq`*[_type == "apartment"]`;
    return await client.fetch(query);
  } catch (error) {
    handleSanityError(error);
  }
}

export async function createApartmentSubmission(data: any) {
  try {
    return await client.create({
      _type: "apartmentSubmission",
      ...data,
    });
  } catch (error) {
    handleSanityError(error);
  }
}

// Example of a more complex update (patch)
export async function updateApartmentStatus(id: string, status: string) {
  try {
    return await client.patch(id).set({ status }).commit();
  } catch (error) {
    handleSanityError(error);
  }
}

export async function deleteApartment(id: string) {
  try {
    return await client.delete(id);
  } catch (error) {
    handleSanityError(error);
  }
}

// Example of a parameterized query (more secure)
export async function searchApartments(searchTerm: string) {
  try {
    const query = groq`*[_type == "apartment" && title match $searchTerm]`;
    return await client.fetch(query, { searchTerm: `*${searchTerm}*` }); // Wildcard search
  } catch (error) {
    handleSanityError(error);
  }
}

// Get all apartment submissions
export async function getAllApartmentSubmissions() {
  try {
    const query = groq`*[_type == "apartmentSubmission"]`;
    return await client.fetch(query);
  } catch (error) {
    handleSanityError(error);
  }
}

// Get a single apartment submission by ID
export async function getApartmentSubmission(id: string) {
  try {
    const query = groq`*[_type == "apartmentSubmission" && _id == $id][0]`;
    return await client.fetch(query, { id });
  } catch (error) {
    handleSanityError(error);
  }
}

// Update an apartment submission
export async function updateApartmentSubmission(id: string, data: any) {
  try {
    return await client.patch(id).set(data).commit();
  } catch (error) {
    handleSanityError(error);
  }
}

export async function deleteApartmentSubmission(id: string) {
  try {
    return await client.delete(id);
  } catch (error) {
    handleSanityError(error);
  }
}
