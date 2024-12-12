import express, {NextFunction, Request, Response} from 'express'
import cache from '../cache'
import URL from '../models/URL'

const redirectRouter = express.Router()

redirectRouter.get('/:shortUrl', async (req: Request, res: Response, next: NextFunction) => {
  const { shortUrl } = req.params

  try {
    // Attempts to retrieve the url from the cache and redirect to it
    const fromCache = cache.get(shortUrl)
    if (fromCache && typeof fromCache === 'string'){
      res.redirect(fromCache)
    } else {
      // If no url is found in the cache, a call is made to the database
      const url = await URL.findOne({shortUrl})
      if (url){
        // The url is put into the cache and redirected to it
        cache.set(url.shortUrl, url.url)
        res.redirect(url.url)
      } else {
        // If no url found in database either, error message sent
        res.status(400).send({error: 'Short url not found'})
      }
    }
  } catch (error: unknown){
    next(error)
  }
})

export default redirectRouter