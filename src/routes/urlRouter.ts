import express, {NextFunction, Request, Response} from 'express'
import { newUrlSchema } from '../utils/schemas'
import { NewUrl, Url } from '../types'
import shortId from 'shortid'
import URL from '../models/URL'
import { ZodError } from 'zod'
import mongoose from 'mongoose'

const urlRouter = express.Router()

// Parser for the request body which validates that the body contains the required attributes for the newUrl
// Zod validates that the url string is in the correct format for a url
const newUrlParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newUrlSchema.parse(req.body)
    next()
  } catch (error: unknown) {
    next(error)
  }
}

urlRouter.post('/shorten', newUrlParser,async (req: Request<unknown, unknown, NewUrl>, res: Response<Url>, next: NextFunction) => {
  // Retrieves the url to shorted from the parsed request body
  const urlToShorten = req.body.url
 
  try {
    const shortUrl = shortId.generate()
    const url = new URL({
      url: urlToShorten,
      shortUrl
    })
    await url.save()
    res.status(200).send({
      url: url.url,
      shortUrl: url.shortUrl,
      created: url.created.toString()
    })
  } catch (error: unknown) {
    next(error)
  }
})

const errorHandler = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  // For responding with the zod issues if the request was not valid
  if (error instanceof ZodError){
    res.status(400).send({error: error.issues})
  } else if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).send({error: error.message})
  } else {
    next(error)
  }
}

urlRouter.use(errorHandler)

export default urlRouter