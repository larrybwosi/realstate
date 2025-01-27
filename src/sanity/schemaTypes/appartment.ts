import { defineType, defineField } from "sanity";

const amenityOptions = [
  "Air Conditioning",
  "Balcony",
  "Dishwasher",
  "Elevator",
  "Fitness Center",
  "Furnished",
  "Garage",
  "Garden",
  "Hardwood Floors",
  "In-unit Laundry",
  "Internet",
  "Parking",
  "Pet-friendly",
  "Pool",
  "Security System",
  "Storage",
  "Walk-in Closet",
  "Washer/Dryer",
  "Wheelchair Accessible",
  "Wi-Fi",
];
export const apartment = defineType({
  name: "apartment",
  title: "Apartment",
  type: "document",
  fields: [
    // Basic Information
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
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      description: "The category this apartment belongs to.",
    }),
    
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Rented", value: "rented" },
          { title: "Under Maintenance", value: "maintenance" },
          { title: "Reserved", value: "reserved" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // Court Reference
    defineField({
      name: "court",
      title: "Court",
      type: "reference",
      to: [{ type: "court" }],
    }),

    // Location in Building
    defineField({
      name: "unit",
      title: "Unit Information",
      type: "object",
      fields: [
        defineField({
          name: "floorNumber",
          title: "Floor Number",
          type: "number",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "unitNumber",
          title: "Unit Number",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "wing",
          title: "Wing/Section",
          type: "string",
        }),
      ],
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
      validation: (Rule) => Rule.required().min(1),
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

    // Physical Characteristics
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "object",
      fields: [
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
          name: "ceilingHeight",
          title: "Ceiling Height (ft)",
          type: "number",
        }),
        defineField({
          name: "exposure",
          title: "Exposure",
          type: "string",
          options: {
            list: ["North", "South", "East", "West"],
          },
        }),
      ],
    }),

    // Rental Information
    defineField({
      name: "rental",
      title: "Rental Information",
      type: "object",
      fields: [
        defineField({
          name: "price",
          title: "Price per Month",
          type: "number",
          validation: (Rule) => Rule.required().positive(),
        }),
        defineField({
          name: "deposit",
          title: "Security Deposit",
          type: "number",
        }),
        defineField({
          name: "availableDate",
          title: "Available Date",
          type: "date",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "minimumLeaseTerm",
          title: "Minimum Lease Term (months)",
          type: "number",
        }),
        defineField({
          name: "utilities",
          title: "Utilities Included",
          type: "array",
          of: [{ type: "string" }],
          options: {
            list: [
              "Water",
              "Electricity",
              "Gas",
              "Internet",
              "Cable TV",
              "Trash",
              "Heat",
            ].map((utility) => ({ title: utility, value: utility })),
          },
        }),
      ],
    }),

    // Features and Amenities
    defineField({
      name: "amenities",
      title: "Unit Amenities",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: amenityOptions.map((amenity) => ({
          title: amenity,
          value: amenity,
        })),
      },
    }),

    // Location
    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'nearbyAttractions',
      title: 'Nearby Attractions',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'attraction' } }],
    }),

    // Additional Information
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "features",
      title: "Special Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "policies",
      title: "Policies",
      type: "object",
      fields: [
        defineField({
          name: "petsAllowed",
          title: "Pets Allowed",
          type: "boolean",
        }),
        defineField({
          name: "petPolicy",
          title: "Pet Policy Details",
          type: "text",
        }),
        defineField({
          name: "smokingAllowed",
          title: "Smoking Allowed",
          type: "boolean",
        }),
        defineField({
          name: "parkingSpaces",
          title: "Parking Spaces",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "additionalInformation",
      title: "Additional Information",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
    })
  ],
});
