const requestor = require('../requestor')

const maxRetryCount = 3
const fetchGroupCount = 10
const pageLimtCount = 20
const fetchSleepTime = 2000

const sleep = time =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })

class Fetcher {
  constructor() {
    this.totalSubmissions = []
    this.retryMap = {}
  }

  async startFetchSubmissions() {
    for (let i = 0; true; i += fetchGroupCount) {
      let { list, isEnd } = await this.fetchSubmissionsListPageByRange(
        i,
        i + fetchGroupCount
      )
      this.totalSubmissions = this.totalSubmissions.concat(list)
      if (isEnd) {
        console.log('抓取结束')
        break
      }
    }

    return this.totalSubmissions
  }

  async fetchSubmissionsListPageByRange(start, end) {
    let isEnd = false
    let res = []

    for (let i = start; i <= end; i++) {
      let data = await this.fetchSubmissionsListPage(i)
      console.log('------')
      if (data && Array.isArray(data.submissions_dump)) {
        res.push(...data.submissions_dump)
        if (!data.has_next) {
          isEnd = true
          break
        }
        await sleep(fetchSleepTime)
      }
    }

    return {
      list: res,
      isEnd
    }
  }

  async fetchSubmissionsListPage(pageIndex) {
    const offset = pageIndex * pageLimtCount
    const url = `https://leetcode.com/api/submissions/?offset=${offset}&limit=${pageLimtCount}`
    let res = null
    try {
      res = await requestor({
        method: 'get',
        url: url,
        responseType: 'json'
      })
    } catch (e) {
      console.log(`抓取失败：列表${pageIndex}`)
    }

    if (res && res.status === 200) {
      console.log(
        `成功抓取: 列表${pageIndex} 长度:${
          res.data.submissions_dump.length
        } offset:${offset}`
      )
      return res.data
    } else if (this.isAbleToRetry(pageIndex)) {
      console.log(`重试: 列表${pageIndex} 开始重试`)
      // 重试
      this.addRetryMap(pageIndex)
      return this.fetchSubmissionsListPage(pageIndex)
    } else {
      // 达到重试上限
      console.log(`放弃抓取: 列表${pageIndex} 达到重试次数上限 放弃抓取`)
      return null
    }
  }

  isAbleToRetry(pageIndex) {
    return !this.retryMap[pageIndex] || this.retryMap[pageIndex] < maxRetryCount
  }

  addRetryMap(pageIndex) {
    if (this.retryMap[pageIndex]) {
      this.retryMap[pageIndex]++
    } else {
      this.retryMap[pageIndex] = 1
    }
  }
}

module.exports = Fetcher
