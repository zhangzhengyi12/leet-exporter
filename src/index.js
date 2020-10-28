const Fetcher = require('./fetcher')
const formatter = require('./formatter')
const MarkdownBuilder = require('./builder/markdownBuilder')
const utils = require('./utils')
const fs = require('fs')

const main = async () => {
  const submissions = await getSubmissions()
  const fileContent = await buildFile(submissions)
  exportFile(fileContent)
}

const getSubmissions = async () => {
  let fetch = new Fetcher()
  let list = await fetch.startFetchSubmissions()
  return formatter(list)
}

const buildFile = async submissions => {
  let builder = new MarkdownBuilder()
  for (let submission of submissions) {
    builder.addSubmission(submission)
  }
  return builder.getExport()
}

const exportFile = async fileContent => {
  const outputPath = utils.createAbsPath('export/leetcode.md')
  fs.writeFileSync(outputPath, fileContent)
  console.log('导出成功!: ', outputPath)
}

module.exports = main()
