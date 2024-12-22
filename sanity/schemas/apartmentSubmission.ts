export const apartmentSubmission = {
  name: 'apartmentSubmission',
  title: 'Apartment Submission',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'landlordName',
      title: 'Landlord Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'landlordEmail',
      title: 'Landlord Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'price',
      title: 'Price per Month',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'squareFootage',
      title: 'Square Footage',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'availableDate',
      title: 'Available Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Review', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
        ],
      },
      initialValue: 'pending',
    },
  ],
}

