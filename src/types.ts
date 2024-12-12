
import { z } from 'zod'
import { newUrlSchema } from './utils/schemas';

export interface Url {
  url: string, 
  shortUrl: string,
  created: string
}

export type NewUrl = z.infer<typeof newUrlSchema>;