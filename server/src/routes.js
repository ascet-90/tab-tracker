const multer = require('multer')()
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')

module.exports = (app) => {
  app.post('/register', multer.array(), AuthenticationControllerPolicy.register, AuthenticationController.register)
  app.post('/login', multer.array(), AuthenticationController.login)
  app.get('/songs', SongsController.index)
  app.post('/songs', multer.array(), SongsController.post)
}
