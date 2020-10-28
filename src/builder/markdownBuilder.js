const ejs = require('ejs')
const fs = require('fs')
const utils = require('../utils')

class MarkdownBuilder {
  constructor() {
    this.fileContent = `# LeetCode Markdown Export
`
    this.template = fs.readFileSync(
      utils.createAbsPath('src/template/submission.markdown.ejs'),
      'utf-8'
    )
  }

  addSubmission(submission) {
    this.fileContent += ejs.render(this.template, { info: submission })
  }

  getExport() {
    return this.fileContent
  }
}

module.exports = MarkdownBuilder
