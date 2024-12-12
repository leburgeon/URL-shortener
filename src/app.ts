import express from 'express'
import urlRouter from './routes/urlRouter'
import redirectRouter from './routes/redirectUrl'

const app = express()

app.use(express.json())

app.use('/ping', (_req, res) => {
  res.send('pong')
})

app.use('/api', urlRouter)

app.use(redirectRouter)

export default app