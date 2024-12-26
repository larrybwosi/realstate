import { defineType, defineField } from "sanity";

export const apartmentSubmission = defineType({
  name: "apartmentSubmission",
  title: "Apartment Submission",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "landlordName",
      title: "Landlord Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "landlordEmail",
      title: "Landlord Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "price",
      title: "Price per Month",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "squareFootage",
      title: "Square Footage",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending Review", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
        ],
      },
      initialValue: "pending",
    }),
  ],
});
