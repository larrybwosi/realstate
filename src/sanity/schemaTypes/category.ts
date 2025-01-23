import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    // Basic Information
    defineField({
      name: "name",
      title: "Category Name",
      type: "string",
      description:
        "The name of the category (e.g., Single Room, Family Size, Luxury Living).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      description: "A unique identifier for the category used in URLs.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description:
        "A brief description of the category and what it represents.",
    }),

    // Visual Representation
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      description: "An icon or visual representation of the category.",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description:
        "A cover image for the category (used in listings or banners).",
      options: {
        hotspot: true,
      },
    }),

    // Category Type
    defineField({
      name: "type",
      title: "Category Type",
      type: "string",
      description: "The type of category (e.g., Standard, Creative, Special).",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          { title: "Creative", value: "creative" },
          { title: "Special", value: "special" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),

    // Select Options (Array of Strings)
    defineField({
      name: "selectOptions",
      title: "Select Options",
      type: "array",
      description: "A list of selectable options or tags for this category.",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Furnished", value: "furnished" },
          { title: "Unfurnished", value: "unfurnished" },
          { title: "Pet-Friendly", value: "pet-friendly" },
          { title: "Eco-Friendly", value: "eco-friendly" },
          { title: "Luxury", value: "luxury" },
          { title: "Budget-Friendly", value: "budget-friendly" },
          { title: "Studio", value: "studio" },
          { title: "Shared", value: "shared" },
          { title: "Private", value: "private" },
        ],
      },
    }),

    // Filters (Optional)
    defineField({
      name: "filters",
      title: "Filters",
      type: "array",
      description:
        "Filters that apply to this category (e.g., number of bedrooms, amenities).",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "filterName",
              title: "Filter Name",
              type: "string",
              description:
                "The name of the filter (e.g., Bedrooms, Bathrooms).",
            }),
            defineField({
              name: "filterValue",
              title: "Filter Value",
              type: "string",
              description: "The value of the filter (e.g., 1, 2, 3+).",
            }),
          ],
        },
      ],
    }),

    // Metadata
    defineField({
      name: "metadata",
      title: "Metadata",
      type: "object",
      description: "Additional metadata for SEO and categorization.",
      fields: [
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          description:
            "Keywords associated with this category for SEO purposes.",
        }),
        defineField({
          name: "popularity",
          title: "Popularity Score",
          type: "number",
          description: "A score representing the popularity of this category.",
        }),
      ],
    }),
  ],
});
