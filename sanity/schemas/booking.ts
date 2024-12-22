export const booking = {
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    {
      name: 'apartmentId',
      title: 'Apartment ID',
      type: 'reference',
      to: [{ type: 'apartment' }],
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    },
    {
      name: 'depositAmount',
      title: 'Deposit Amount',
      type: 'number',
    },
    {
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
        ],
      },
      initialValue: 'pending',
    },
  ],
}

