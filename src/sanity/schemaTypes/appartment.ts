import { defineType, defineField } from "sanity";

export const apartment = defineType({
  name: "apartment",
  title: "Apartment",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            // Fields for individual images
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
              description: "Important for SEO and accessibility",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "price",
      title: "Price per Month",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "squareFootage",
      title: "Square Footage",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "availableDate",
      title: "Available Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "floorPlan",
      title: "Floor Plan",
      type: "image",
    }),
    defineField({
      name: "virtualTourUrl",
      title: "Virtual Tour URL",
      type: "url",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Family Size", value: "family" },
          { title: "Single Room", value: "single" },
          { title: "Luxury", value: "luxury" },
          { title: "Student Housing", value: "student" },
        ],
      },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
    }),
    defineField({
      name: "parkingSpaces",
      title: "Parking Spaces",
      type: "number",
    }),
    defineField({
      name: "petsAllowed",
      title: "Pets Allowed",
      type: "boolean",
    }),
    defineField({
      name: "leaseTerms",
      title: "Lease Terms",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "nearbyAttractions",
      title: "Nearby Attractions",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "court",
      title: "Court",
      type: "reference",
      to: [{ type: "court" }],
    }),
    defineField({
      name: "floorNumber",
      title: "Floor Number",
      type: "number",
    }),
    defineField({
      name: "apartmentNumber",
      title: "Apartment Number",
      type: "string",
    }),
  ],
});
