const path = require('path')
const fs = require('fs')
const utils = require('../utils')

const cookie = (() => {
  let res = ''
  try {
    res = fs.readFileSync(utils.createAbsPath('src/cookie.txt'), 'utf-8')
  } catch (e) {
    console.log(e)
  }
  if (!res) {
    console.error('请创建cookie文件')
  }
  return ''
})()

module.exports = {
  cookie
}
