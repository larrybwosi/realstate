export const cleaningJob = {
  name: 'cleaningJob',
  title: 'Cleaning Job',
  type: 'document',
  fields: [
    {
      name: 'apartment',
      title: 'Apartment',
      type: 'reference',
      to: [{ type: 'apartment' }],
    },
    {
      name: 'requestedBy',
      title: 'Requested By',
      type: 'reference',
      to: [{ type: 'user' }],
    },
    {
      name: 'assignedTo',
      title: 'Assigned To',
      type: 'reference',
      to: [{ type: 'user' }],
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Requested', value: 'requested' },
          { title: 'Assigned', value: 'assigned' },
          { title: 'In Progress', value: 'inProgress' },
          { title: 'Completed', value: 'completed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'requested',
    },
    {
      name: 'tasks',
      title: 'Tasks',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'scheduledDate',
      title: 'Scheduled Date',
      type: 'datetime',
    },
    {
      name: 'duration',
      title: 'Duration (hours)',
      type: 'number',
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'text',
    },
  ],
}

