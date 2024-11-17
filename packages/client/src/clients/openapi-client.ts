import createClient from 'openapi-fetch';
import type { paths } from '../generated/api-types';
import { environment } from '../environment';

export const openapiClient = createClient<paths>({
  baseUrl: environment.apiUrl,
});
