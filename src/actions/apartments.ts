import { client } from '@/sanity/lib/client'
import { Apartment } from '@/types/apartment'

export async function getApartments(params: {
  location?: string
  category?: string
  bedrooms?: number
  bathrooms?: number
  minPrice?: number
  maxPrice?: number
  petsAllowed?: boolean
}): Promise<Apartment[]> {
  const {
    location,
    category,
    bedrooms,
    bathrooms,
    minPrice,
    maxPrice,
    petsAllowed,
  } = params

  let query = '*[_type == "apartment"'

  if (location) {
    query += ` && (title match "${location}" || description match "${location}")`
  }
  if (category) {
    query += ` && category == "${category}"`
  }
  if (bedrooms) {
    query += ` && bedrooms >= ${bedrooms}`
  }
  if (bathrooms) {
    query += ` && bathrooms >= ${bathrooms}`
  }
  if (minPrice) {
    query += ` && price >= ${minPrice}`
  }
  if (maxPrice) {
    query += ` && price <= ${maxPrice}`
  }
  if (petsAllowed !== undefined) {
    query += ` && petsAllowed == ${petsAllowed}`
  }

  query += ']'

  const apartments: Apartment[] = await client.fetch(query)
  return apartments
}

