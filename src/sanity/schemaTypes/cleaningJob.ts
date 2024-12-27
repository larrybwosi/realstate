import { defineType, defineField } from "sanity";

export const cleaningJob = defineType({
  name: "cleaningJob",
  title: "Cleaning Job",
  type: "document",
  fields: [
    defineField({
      name: "apartment",
      title: "Apartment",
      type: "reference",
      to: [{ type: "apartment" }],
    }),
    defineField({
      name: "requestedBy",
      title: "Requested By",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "assignedTo",
      title: "Assigned To",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Requested", value: "requested" },
          { title: "Assigned", value: "assigned" },
          { title: "In Progress", value: "inProgress" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "requested",
    }),
    defineField({
      name: "tasks",
      title: "Tasks",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "scheduledDate",
      title: "Scheduled Date",
      type: "datetime",
    }),
    defineField({
      name: "duration",
      title: "Duration (hours)",
      type: "number",
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
    }),
    defineField({
      name: "cleaningType",
      title: "Cleaning Type",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          { title: "Deep Clean", value: "deepClean" },
          { title: "Move-in/Move-out", value: "moveInOut" },
          { title: "Post-Construction", value: "postConstruction" },
        ],
      },
    }),
    defineField({
      name: "specialRequirements",
      title: "Special Requirements",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "equipmentNeeded",
      title: "Equipment Needed",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "payRate",
      title: "Pay Rate",
      type: "number",
    }),
  ],
});
