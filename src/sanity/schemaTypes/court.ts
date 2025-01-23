import { defineType, defineField } from "sanity";

export const court = defineType({
  name: "court",
  title: "Court",
  type: "document",
  fields: [
    // Basic Information
    defineField({
      name: "name",
      title: "Court Name",
      type: "string",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    // Media
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
    }),

    // Building Details
    defineField({
      name: "yearBuilt",
      title: "Year Built",
      type: "number",
    }),
    defineField({
      name: "totalFloors",
      title: "Total Floors",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "totalApartments",
      title: "Total Apartments",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),

    // Location
    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        defineField({ name: "street", title: "Street", type: "string" }),
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "state", title: "State", type: "string" }),
        defineField({ name: "zipCode", title: "ZIP Code", type: "string" }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    // Building Amenities
    defineField({
      name: "buildingAmenities",
      title: "Building Amenities",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "24/7 Security",
          "Elevator",
          "Fitness Center",
          "Parking Garage",
          "Pool",
          "Rooftop Deck",
          "Storage Units",
          "Visitor Parking",
          "Package Room",
          "Business Center",
          "Community Room",
        ].map((amenity) => ({ title: amenity, value: amenity })),
      },
    }),

    // Management Information
    defineField({
      name: "management",
      title: "Management Information",
      type: "object",
      fields: [
        defineField({
          name: "companyName",
          title: "Management Company",
          type: "string",
        }),
        defineField({
          name: "contactPerson",
          title: "Contact Person",
          type: "string",
        }),
        defineField({
          name: "phone",
          title: "Phone",
          type: "string",
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
        }),
        defineField({
          name: "officeHours",
          title: "Office Hours",
          type: "text",
        }),
      ],
    }),
  ],
});
