import { defineType, defineField } from "sanity";

export const booking = defineType({
  name: "booking",
  title: "Booking",
  type: "document",
  fields: [
    defineField({
      name: "apartmentId",
      title: "Apartment ID",
      type: "reference",
      to: [{ type: "apartment" }],
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
    }),
    defineField({
      name: "depositAmount",
      title: "Deposit Amount",
      type: "number",
    }),
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
        ],
      },
      initialValue: "pending",
    }),
  ],
});
