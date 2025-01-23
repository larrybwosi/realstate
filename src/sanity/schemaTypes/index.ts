import { type SchemaTypeDefinition } from 'sanity'
import { apartment } from './appartment'
import { apartmentSubmission } from './appartmentSubmission';
import { cleaningJob } from './cleaningJob';
import { court } from './court';
import { user } from './user';
import { category } from './category';
import { attraction } from './attraction';
import { booking } from './booking';
import cleaningPersonel from './cleaningPersonel';
import cleaningRequest from './cleaningRequest';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    apartment,
    apartmentSubmission,
    cleaningJob,
    court,
    user,
    category,
    attraction,
    booking,
    cleaningPersonel,
    cleaningRequest
  ],
};
