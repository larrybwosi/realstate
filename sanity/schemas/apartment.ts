export const apartment = {
  name: 'apartment',
  title: 'Apartment',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'squareFootage',
      title: 'Square Footage',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
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
    },
    {
      name: 'floorPlan',
      title: 'Floor Plan',
      type: 'image',
    },
    {
      name: 'virtualTourUrl',
      title: 'Virtual Tour URL',
      type: 'url',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Family Size', value: 'family' },
          { title: 'Single Room', value: 'single' },
          { title: 'Luxury', value: 'luxury' },
          { title: 'Student Housing', value: 'student' },
        ],
      },
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'location',
      title: 'Location',
      type: 'geopoint',
    },
    {
      name: 'parkingSpaces',
      title: 'Parking Spaces',
      type: 'number',
    },
    {
      name: 'petsAllowed',
      title: 'Pets Allowed',
      type: 'boolean',
    },
    {
      name: 'leaseTerms',
      title: 'Lease Terms',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'nearbyAttractions',
      title: 'Nearby Attractions',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'court',
      title: 'Court',
      type: 'reference',
      to: [{ type: 'court' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'floorNumber',
      title: 'Floor Number',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'apartmentNumber',
      title: 'Apartment Number',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
  ],
}

