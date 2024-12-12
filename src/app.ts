import express from 'express'
import urlRouter from './routes/urlRouter'

const app = express()

app.use(express.json())

app.use('/ping', (_req, res) => {
  res.send('pong')
})

app.use('/api', urlRouter)



export default app