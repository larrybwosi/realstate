import { defineField, defineType } from "sanity";

export default defineType({
  name: "cleaningRequest",
  title: "Cleaning Request",
  type: "document",
  fields: [
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locationDescription",
      title: "Location Description",
      type: "text",
    }),
    defineField({
      name: "propertyType",
      title: "Property Type",
      type: "string",
      options: {
        list: [
          { title: "Apartment", value: "apartment" },
          { title: "House", value: "house" },
          { title: "Office", value: "office" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "sizeUnit",
      title: "Size Unit",
      type: "string",
      options: {
        list: [
          { title: "Square Feet", value: "sqft" },
          { title: "Square Meters", value: "sqm" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cleaningType",
      title: "Cleaning Type",
      type: "string",
      options: {
        list: [
          { title: "Standard Cleaning", value: "standard" },
          { title: "Deep Cleaning", value: "deep" },
          { title: "Move In/Out Cleaning", value: "move-in-out" },
          { title: "Custom Cleaning", value: "custom" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "outsideCleaningServices",
      title: "Outside Cleaning Services",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      options: {
        list: [
          { title: "Morning (8AM - 12PM)", value: "morning" },
          { title: "Afternoon (12PM - 4PM)", value: "afternoon" },
          { title: "Evening (4PM - 8PM)", value: "evening" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "frequency",
      title: "Frequency",
      type: "string",
      options: {
        list: [
          { title: "One-time", value: "one-time" },
          { title: "Weekly", value: "weekly" },
          { title: "Bi-weekly", value: "bi-weekly" },
          { title: "Monthly", value: "monthly" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "specialInstructions",
      title: "Special Instructions",
      type: "text",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Assigned", value: "assigned" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "assignedTo",
      title: "Assigned To",
      type: "array",
      of: [{ type: "reference", to: [{ type: "cleaningPersonnel" }] }],
    }),
  ],
});
