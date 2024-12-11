import express from 'express'

const app = express()

app.use('/ping', (_req, res) => {
  res.send('pong')
})

export default app