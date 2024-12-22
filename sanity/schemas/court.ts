export const court = {
  name: 'court',
  title: 'Court',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Court Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Court Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'totalFloors',
      title: 'Total Floors',
      type: 'number',
    },
    {
      name: 'totalApartments',
      title: 'Total Apartments',
      type: 'number',
    },
  ],
}

