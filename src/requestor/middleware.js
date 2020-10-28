const config = require('../config')
const httpHeader = require('./http-header')

function middleware(axios) {
  axios.interceptors.request.use(function(req) {
    req.headers = {
      ...req.headers,
      ...httpHeader,
      ...{
        cookie: config.cookie
      }
    }
    return req
  })
}

module.exports = middleware
