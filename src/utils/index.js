const fs = require('fs')
const path = require('path')
const config = require('../config')

const createAbsPath = aPath => {
  return path.resolve(config.root, aPath)
}

module.exports = {
  createAbsPath
}
