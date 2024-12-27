import { defineField, defineType } from "sanity";

export default defineType({
  name: "cleaningPersonnel",
  title: "Cleaning Personnel",
  type: "document",
  fields: [
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
    }),
    defineField({
      name: "specialties",
      title: "Specialties",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Standard Cleaning", value: "standard" },
          { title: "Deep Cleaning", value: "deep" },
          { title: "Move In/Out Cleaning", value: "move-in-out" },
          { title: "Post-Construction Cleaning", value: "post-construction" },
          { title: "Green Cleaning", value: "green" },
          { title: "Commercial Cleaning", value: "commercial" },
        ],
      },
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Monday", value: "monday" },
          { title: "Tuesday", value: "tuesday" },
          { title: "Wednesday", value: "wednesday" },
          { title: "Thursday", value: "thursday" },
          { title: "Friday", value: "friday" },
          { title: "Saturday", value: "saturday" },
          { title: "Sunday", value: "sunday" },
        ],
      },
    }),
    defineField({
      name: "preferredHours",
      title: "Preferred Hours",
      type: "string",
      options: {
        list: [
          { title: "Morning (6AM - 12PM)", value: "morning" },
          { title: "Afternoon (12PM - 6PM)", value: "afternoon" },
          { title: "Evening (6PM - 12AM)", value: "evening" },
          { title: "Night (12AM - 6AM)", value: "night" },
          { title: "Flexible", value: "flexible" },
        ],
      },
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Years of Experience",
      type: "number",
    }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
    }),
    defineField({
      name: "profilePicture",
      title: "Profile Picture",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "completedJobs",
      title: "Completed Jobs",
      type: "number",
    }),
  ],
});