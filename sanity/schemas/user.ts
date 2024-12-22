export const user = {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'url',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Tenant', value: 'tenant' },
          { title: 'Landlord', value: 'landlord' },
          { title: 'Cleaning Personnel', value: 'cleaner' },
          { title: 'Admin', value: 'admin' },
        ],
      },
    },
    {
      name: 'apartments',
      title: 'Apartments',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'apartment' }] }],
    },
    {
      name: 'cleaningSkills',
      title: 'Cleaning Skills',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ document }) => document?.role !== 'cleaner',
    },
  ],
}

