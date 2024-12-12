import express from 'express'
import urlRouter from './routes/urlRouter'
import redirectRouter from './routes/redirectUrl'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/ping', (_req, res) => {
  res.send('pong')
})

app.use('/api', urlRouter)

app.use(redirectRouter)

export default app