import { type SchemaTypeDefinition } from 'sanity'
import { apartment } from './appartment'
import { apartmentSubmission } from './appartmentSubmission';
import { cleaningJob } from './cleaningJob';
import { court } from './court';
import { user } from './user';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    apartment, apartmentSubmission,
    cleaningJob, court,user
  ],
};
