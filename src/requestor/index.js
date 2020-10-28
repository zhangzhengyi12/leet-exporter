const axios = require('axios')
const middleware = require('./middleware')

let instance = axios.create({})

middleware(instance)

module.exports = instance
