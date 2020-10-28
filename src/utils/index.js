const fs = require('fs')
const path = require('path')
const config = require('../config')

const createAbsPath = aPath => {
  return path.resolve(__dirname, '../../', aPath)
}

module.exports = {
  createAbsPath
}
