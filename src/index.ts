import app from './app'
import config from './utils/config'

app.listen(config.PORT || 3000, () => {
  console.log('app listening on port ' + config.PORT)
})

  