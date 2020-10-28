// 对数据进行格式化
const formatterData = list => {
  return order(filterRpeat(filterNotAccepted(list)))
}

const filterNotAccepted = list => {
  return list.filter(v => v.status_display === 'Accepted')
}

// 过滤所有重复的提交 保留最近的一次
const filterRpeat = list => {
  let keyMap = {}
  let res = []
  for (let item of list) {
    if (keyMap[item.title]) {
      continue
    } else {
      res.push(item)
      keyMap[item.title] = true
    }
  }
  return res
}

// 重排序 暂时不排序
const order = list => {
  return list
}

module.exports = formatterData
