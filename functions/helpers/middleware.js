/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */

const cors = require('cors')({ origin: true })
const jsonParser = require('body-parser').json()

const cleanRequest = async (request, response, next) => {
  cors(request, response, async () => {
    jsonParser(request, response, async () => {
      next()
    })
  })
}

// Middleware to validate signed requests
const validateFirebaseIdToken = (admin) => async (request, response, next) => {
  let idToken
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = request.headers.authorization.split('Bearer ')[1]
  } else if (request.cookies && request.cookies.__session) {
    idToken = request.cookies.__session
  } else {
    return next(new Error('Unauthorized'))
  }
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken)
    request.user = decodedIdToken
  } catch (e) {
    return next(e)
  }
  next()
}

module.exports = (admin) => ({
  cleanRequest,
  validateFirebaseIdToken: validateFirebaseIdToken(admin),
})
