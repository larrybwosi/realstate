import { defineType, defineField } from "sanity";

export const court = defineType({
  name: "court",
  title: "Court",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Court Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Court Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "totalFloors",
      title: "Total Floors",
      type: "number",
    }),
    defineField({
      name: "totalApartments",
      title: "Total Apartments",
      type: "number",
    }),
  ],
});
