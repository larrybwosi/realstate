import { defineType, defineField } from "sanity";

export const attraction = defineType({
  name: "attraction",
  title: "Attraction",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});
