import { defineType, defineField } from "sanity";

export const user = defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "url",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Tenant", value: "tenant" },
          { title: "Landlord", value: "landlord" },
          { title: "Cleaning Personnel", value: "cleaner" },
          { title: "Admin", value: "admin" },
        ],
      },
    }),
    defineField({
      name: "apartments",
      title: "Apartments",
      type: "array",
      of: [{ type: "reference", to: [{ type: "apartment" }] }],
    }),
    defineField({
      name: "cleaningSkills",
      title: "Cleaning Skills",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ document }) => document?.role !== "cleaner",
    }),
  ],
});
