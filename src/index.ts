import app from './app'
import config from './utils/config'
import mongoose from 'mongoose'

console.log('#################################')
console.log('HEREE')

async function startServer() {
  // For attempting connection to the database
  try {
    console.log('connecting to MongoDB...')
    await mongoose.connect(config.MONGODB_URL)
    console.log('Connected')
  } catch (error: unknown) {
    let errorMessage = 'Error connecting to database: '
    if (error instanceof Error) {
      errorMessage += error.message
    }
    console.log(errorMessage)
  }

  app.listen(config.PORT, () => {
    console.log('app listening on port ' + config.PORT)
  })
}

// For starting the in memory cache


// Handle the promise returned by startServer
startServer().catch((error) => {
  console.error('Failed to start server:', error)
})
  