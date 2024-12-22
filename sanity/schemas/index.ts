import { schemaTypes } from 'sanity';
import { user } from './user'
import { cleaningService } from './cleaningService'
import { cleaningJob } from './cleaningJob'

export const schema = {
  name: 'default',
  types: schemaTypes.concat([
    user,
    cleaningService,
    cleaningJob,
    // ... other schemas
  ]),
}

