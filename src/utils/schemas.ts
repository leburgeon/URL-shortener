import { z } from 'zod'

// zod schema for validating request body contains the required attributes to add a new url
// Validates that the url field is the correct format for a url
export const newUrlSchema = z.object({
  url: z.string().url()
})

export const urlSchema = z.object({
  url: z.string().url(),
  shortUrl: z.string(),
  created: z.number()
})