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
  ],
});
