# leet-exporter

leetcode submissions exporter

export your submissions to markdown file

## How to run it?

1. git clone git@github.com:zhangzhengyi12/leet-exporter.git
2. cd leet-exporter && npm i
3. touch src/cookie.txt && echo "{your leetcode api cookie}" > src/cookie.text
4. npm run export


# output example

## LeetCode Markdown Export

## Triangle

[problem](https://leetcode.com/problems/triangle/ )

[submission detail](https://leetcode.com/submissions/detail/414073677/ )

```javascript 
var minimumTotal = function(triangle) {
  let n = triangle.length
  let minLen = [triangle[0][0]]

  for (let i = 1; i < n; i++) {
    let newMinLen = []
    for (let j = 0; j < triangle[i].length; j++) {
      let nodeDis = triangle[i][j]
      if (j === 0) {
        newMinLen.push(minLen[0] + nodeDis)
      } else if (j === triangle[i].length - 1) {
        newMinLen.push(minLen[j - 1] + nodeDis)
      } else {
        newMinLen.push(Math.min(minLen[j - 1] + nodeDis, minLen[j] + nodeDis))
      }
    }
    minLen = newMinLen
  }

  return Math.min(...minLen)
}
 
```

## Maximum Product Subarray

[problem](https://leetcode.com/problems/maximum-product-subarray/ )

[submission detail](https://leetcode.com/submissions/detail/414065575/ )

```javascript 
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  let n = nums.length
  let res = nums[0]
  let l = 0
  let r = 0

  for (let i = 0; i < n; i++) {
    l = (l === 0 ? 1 : l) * nums[i]
    r = (r === 0 ? 1 : r) * nums[n - 1 - i]
    res = Math.max(res, Math.max(l, r))
  }

  return res
} 
```

## Best Time to Buy and Sell Stock

[problem](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/ )

[submission detail](https://leetcode.com/submissions/detail/414014817/ )

```javascript 
var maxProfit = function(prices) {
  let n = prices.length
  let maxValue = 0
  let maxOffset = 0
  for (let i = n - 2; i >= 0; i--) {
    if (prices[i + 1] > maxValue) {
      maxValue = prices[i + 1]
    }
    if (maxValue - prices[i] > maxOffset) {
      maxOffset = maxValue - prices[i]
    }
  }

  return maxOffset
} 
```

## Coin Change

[problem](https://leetcode.com/problems/coin-change/ )

[submission detail](https://leetcode.com/submissions/detail/411826871/ )

```javascript 
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  let dp = new Array(amount + 1).fill(0)

  for (let i = 1; i <= amount; i++) {
    dp[i] = -1
    for (let coin of coins) {
      if (dp[i - coin] >= 0 && (dp[i - coin] + 1 < dp[i] || dp[i] === -1)) {
        dp[i] = dp[i - coin] + 1
      }
    }
  }

  return dp[amount]
}
 
```

## Minimum Path Sum

[problem](https://leetcode.com/problems/minimum-path-sum/ )

[submission detail](https://leetcode.com/submissions/detail/411822190/ )

```javascript 
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  let n = grid.length
  let m = grid[0].length
  let dp = new Array(n).fill(1).map(() => new Array(m).fill(0))
  dp[0][0] = grid[0][0]

  for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0]
  }

  for (let j = 1; j < m; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j]
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j]
    }
  }

  return dp[n - 1][m - 1]
}
 
```

## Regular Expression Matching

[problem](https://leetcode.com/problems/regular-expression-matching/ )

[submission detail](https://leetcode.com/submissions/detail/411790219/ )

```javascript 
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  if (p.length === 0) {
    return s.length === 0
  }

  let n = s.length
  let m = p.length

  let dp = new Array(n + 1).fill(1).map(() => new Array(m + 1).fill(false))
  dp[0][0] = true

  for (let j = 2; j <= m; j++) {
    dp[0][j] = p[j - 1] === '*' && dp[0][j - 2]
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (p[j - 1] === s[i - 1] || p[j - 1] === '.') {
        dp[i][j] = dp[i - 1][j - 1]
      } else if (p[j - 1] === '*') {
        dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (s[i - 1] === p[j - 2] || p[j - 2] === '.'))
      }
    }
  }

  return dp[n][m]
}
 
```

## Valid Sudoku

[problem](https://leetcode.com/problems/valid-sudoku/ )

[submission detail](https://leetcode.com/submissions/detail/411410580/ )

```javascript 
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  let n = board.length
  let m = board[0].length

  let hashSet = new Set()

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let char = board[i][j]
      if (char !== '.') {
        let blockI = Math.floor(i / 3)
        let blockJ = Math.floor(j / 3)
        let rTag = 'r' + i + char
        let cTag = 'c' + j + char
        let bTag = 'b' + blockI + '+' + blockJ + char
        if (hashSet.has(rTag) || hashSet.has(cTag) || hashSet.has(bTag)) {
          return false
        } else {
          hashSet.add(rTag)
          hashSet.add(cTag)
          hashSet.add(bTag)
        }
      }
    }
  }

  return true
} 
```

## Number of Islands

[problem](https://leetcode.com/problems/number-of-islands/ )

[submission detail](https://leetcode.com/submissions/detail/411303393/ )

```javascript 
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  let n = grid.length
  let m = grid[0].length
  let maxIsland = 0

  for (let i = 0; i < n; i++) {
    for (let j = 0; j< m; j++) {
      if (grid[i][j] === '1') {
        _dfs(grid, i, j, n, m)
        maxIsland++
      }
    }
  }

  return maxIsland
}

const _dfs = (grid, i, j, n, m) => {
  if (i < 0 || i >= n || j < 0 || j >= m || grid[i][j] === '0') {
    return
  }

  grid[i][j] = '0'
  _dfs(grid, i - 1, j, n, m)
  _dfs(grid, i, j + 1, n, m)
  _dfs(grid, i + 1, j, n, m)
  _dfs(grid, i, j - 1, n, m)
}
 
```

## Binary Tree Inorder Traversal

[problem](https://leetcode.com/problems/binary-tree-inorder-traversal/ )

[submission detail](https://leetcode.com/submissions/detail/410600048/ )

```javascript 
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  let res = []
  let stack = []
  
  while(root || stack.length > 0){
      while(root){
          stack.push(root)
          root = root.left
      }
      
      root = stack.pop()
      res.push(root.val)
      root = root.right
  }    
   return res
}
 
```

## Binary Tree Postorder Traversal

[problem](https://leetcode.com/problems/binary-tree-postorder-traversal/ )

[submission detail](https://leetcode.com/submissions/detail/410599822/ )

```javascript 
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  let stack = [{node:root,vi:false}]
  let res = []
  
  while(stack.length > 0){
      let o = stack.pop()
      if(o.node){
          if(o.vi){
              res.push(o.node.val)
          }else {
              stack.push({node:o.node,vi:true})
              stack.push({node:o.node.right,vi:false})
              stack.push({node:o.node.left,vi:false})
          }
      }
  }
    
    return res
}
 
```

## Binary Tree Preorder Traversal

[problem](https://leetcode.com/problems/binary-tree-preorder-traversal/ )

[submission detail](https://leetcode.com/submissions/detail/410598965/ )

```javascript 
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let stack = [root]
    let res = []
    
    while(stack.length > 0){
        let node = stack.pop()
        if(node){
            res.push(node.val)
            stack.push(node.right)
            stack.push(node.left)
        }
    }
    
    return res
}
 
```

## Validate Binary Search Tree

[problem](https://leetcode.com/problems/validate-binary-search-tree/ )

[submission detail](https://leetcode.com/submissions/detail/410581316/ )

```javascript 
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

var isValidBST = function(root) {
  if (!root) return true
  let stack = []
  let pre = null

  while (root || stack.length > 0) {
    while (root) {
      stack.push(root)
      root = root.left
    }

    root = stack.pop()
    if (pre && root.val <= pre.val) return false

    pre = root
    root = root.right
  }

  return true
}
 
```

## Maximum Depth of Binary Tree

[problem](https://leetcode.com/problems/maximum-depth-of-binary-tree/ )

[submission detail](https://leetcode.com/submissions/detail/410556897/ )

```javascript 
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  if (!root) return 0
  return _maxDepth(root, 1)
}

const _maxDepth = (root, n) => {
  let maxLevel = n
  if (root.left) {
    let ln = _maxDepth(root.left, n + 1)
    if (ln > maxLevel) maxLevel = ln
  }
  if (root.right) {
    let rn = _maxDepth(root.right, n + 1)
    if (rn > maxLevel) maxLevel = rn
  }
  return maxLevel
}
 
```

## Invert Binary Tree

[problem](https://leetcode.com/problems/invert-binary-tree/ )

[submission detail](https://leetcode.com/submissions/detail/410548001/ )

```javascript 
var invertTree = function(root) {
  if (!root) return root
  const temp = root.left
  root.left = root.right
  root.right = temp
  invertTree(root.left)
  invertTree(root.right)
  return root
} 
```

## Reverse Words in a String

[problem](https://leetcode.com/problems/reverse-words-in-a-string/ )

[submission detail](https://leetcode.com/submissions/detail/410238360/ )

```javascript 
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  return s
    .trim()
    .split(/\s+/)
    .reverse()
    .join(' ')
}
 
```

## Reverse String

[problem](https://leetcode.com/problems/reverse-string/ )

[submission detail](https://leetcode.com/submissions/detail/410236215/ )

```javascript 
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
  let start = 0
  let end = s.length - 1

  while (start < end) {
    let temp = s[start]
    s[start] = s[end]
    s[end] = temp
    start++
    end--
  }

  return s
}
 
```

## Intersection of Two Linked Lists

[problem](https://leetcode.com/problems/intersection-of-two-linked-lists/ )

[submission detail](https://leetcode.com/submissions/detail/410178584/ )

```javascript 
var getIntersectionNode = function(headA, headB) {
  if (!headA || !headB) return null

  let a = headA
  let b = headB

  while (a !== b) {
    a = a ? a.next : headB
    b = b ? b.next : headA
  }

  return a
}
 
```

## Sqrt(x)

[problem](https://leetcode.com/problems/sqrtx/ )

[submission detail](https://leetcode.com/submissions/detail/409302238/ )

```javascript 
var mySqrt = function(x) {
  let s = 0
  let e = x
  let mid = (s + e) / 2
  let gr = mid ** 2

  if (x === 1 || x === -1) return 1

  while (Math.abs(gr - x) > 0.01) {
    mid = (s + e) / 2
    gr = mid ** 2
    if (gr === x) return mid || 0
    if (gr < x) {
      s = mid
    } else {
      e = mid
    }
  }

  return mid | 0
} 
```

## Climbing Stairs

[problem](https://leetcode.com/problems/climbing-stairs/ )

[submission detail](https://leetcode.com/submissions/detail/409295860/ )

```javascript 
var climbStairs = function(n) {
  if (n === 1) return 1
  let dp = [0, 1, 2]
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
}
 
```

## Trapping Rain Water

[problem](https://leetcode.com/problems/trapping-rain-water/ )

[submission detail](https://leetcode.com/submissions/detail/409096051/ )

```javascript 
var trap = function(height) {
  let n = height.length
  let maxWater = 0

  let leftMaxValues = [0]
  for (let i = 1; i < n; i++) {
    if (leftMaxValues[i - 1] < height[i - 1]) {
      leftMaxValues[i] = height[i - 1]
    } else {
      leftMaxValues[i] = leftMaxValues[i - 1]
    }
  }

  let rightMaxValues = []
  rightMaxValues[n - 1] = 0
  for (let i = n - 2; i >= 0; i--) {
    if (rightMaxValues[i + 1] < height[i + 1]) {
      rightMaxValues[i] = height[i + 1]
    } else {
      rightMaxValues[i] = rightMaxValues[i + 1]
    }
  }

  for (let i = 1; i < n - 1; i++) {
    if (leftMaxValues[i] > height[i] && rightMaxValues[i] > height[i]) {
      maxWater += Math.min(
        leftMaxValues[i] - height[i],
        rightMaxValues[i] - height[i]
      )
    }
  }

  return maxWater
} 
```

## Sliding Window Maximum

[problem](https://leetcode.com/problems/sliding-window-maximum/ )

[submission detail](https://leetcode.com/submissions/detail/409089789/ )

```javascript 
var maxSlidingWindow = function(nums, k) {
  const n = nums.length
  if (n === 0) {
    return nums
  }
  let res = []
  let q = []
  for (let i = 0; i < n; i++) {
    while (q.length !== 0 && q[0] < i - k + 1) {
      q.shift()
    }
    while (q.length !== 0 && nums[i] >= nums[q[q.length - 1]]) {
      q.pop()
    }
    q.push(i)
    if (i - k + 1 >= 0) {
      res.push(nums[q[0]])
    }
  }

  return res
} 
```

## Design Circular Deque

[problem](https://leetcode.com/problems/design-circular-deque/ )

[submission detail](https://leetcode.com/submissions/detail/409053310/ )

```javascript 
class MyCircularDeque {
  constructor(k) {
    this.head = 0
    this.tail = 0
    this.arr = Array(k).fill(null)
    this.n = k + 1 // 多一个冗余位 为了区分队满和对空
  }

  // 返回 对于 a 减去 B 之后 对 N 进行取余的数
  // 正整数且一旦小于0之后，会从后面重新开始
  // 本质上找同余
  getSubMod(a, b, n) {
    return (a + n - b) % n
  }

  insertFront(val) {
    if (this.isFull()) {
      return false
    }
    const nextHead = this.getSubMod(this.head, 1, this.n)
    this.arr[nextHead] = val
    this.head = nextHead

    return true
  }

  insertLast(val) {
    if (this.isFull()) {
      return false
    }
    this.arr[this.tail] = val
    this.tail = (this.tail + 1) % this.n

    return true
  }

  deleteFront() {
    if (this.isEmpty()) {
      return false
    }

    this.arr[this.head] = null
    this.head = (this.head + 1) % this.n
    return true
  }

  deleteLast() {
    if (this.isEmpty()) {
      return false
    }

    const prevTail = this.getSubMod(this.tail, 1, this.n)
    this.arr[prevTail] = null
    this.tail = prevTail
    return true
  }

  getFront() {
    const res = this.arr[this.head]
    return res === null ? -1 : res
  }

  getRear() {
    const prevTail = this.getSubMod(this.tail, 1, this.n)
    const res = this.arr[prevTail]
    return res === null ? -1 : res
  }

  isEmpty() {
    return this.head === this.tail
  }

  isFull() {
    return (this.tail + 1) % this.n === this.head
  }
}
 
```

## Pascal's Triangle

[problem](https://leetcode.com/problems/pascals-triangle/ )

[submission detail](https://leetcode.com/submissions/detail/408540493/ )

```javascript 
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  var res = []
  for (let i = 0; i < numRows; i++) {
    res[i] = []
    for (let j = 0; j < i + 1; j++) {
      if (j === 0 || j === i) {
        res[i].push(1)
      } else {
        res[i].push(res[i - 1][j - 1] + res[i - 1][j])
      }
    }
  }
  return res
} 
```

## Evaluate Reverse Polish Notation

[problem](https://leetcode.com/problems/evaluate-reverse-polish-notation/ )

[submission detail](https://leetcode.com/submissions/detail/408520735/ )

```javascript 
var evalRPN = function(tokens) {
  const n = tokens.length
  let stack = []

  for (let i = 0; i < n; i++) {
    let token = tokens[i]
    if (/^[+\-*/]$/.test(token)) {
      let b = stack.pop()
      let a = stack.pop()
      stack.push(evaluate(token, a, b))
    } else {
      stack.push(+token)
    }
  }

  return stack[0]
}

function evaluate(o, a, b) {
  if (o === '+') {
    return a + b
  } else if (o === '-') {
    return a - b
  } else if (o === '*') {
    return a * b
  } else if (o === '/') {
    return (a / b) | 0
  }
} 
```

## Longest Valid Parentheses

[problem](https://leetcode.com/problems/longest-valid-parentheses/ )

[submission detail](https://leetcode.com/submissions/detail/408453218/ )

```javascript 
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
  let n = s.length
  let stack = [-1]
  let maxLen = 0

  for (let i = 0; i < n; i++) {
    if (s[i] === '(') {
      stack.push(i)
    } else {
      stack.pop()
      if (stack.length === 0) {
        stack.push(i)
      } else {
        maxLen = Math.max(maxLen, i - stack[stack.length - 1])
      }
    }
  }

  return maxLen
} 
```

## Valid Parentheses

[problem](https://leetcode.com/problems/valid-parentheses/ )

[submission detail](https://leetcode.com/submissions/detail/408161334/ )

```javascript 
/**
 * @param {string} s
 * @return {boolean}
 */

var isValid = function(s) {
    let n = s.length
    let stack = []
    const tokenMap = {
        ')':'(',
         ']':'[',
         '}':'{'
    }
    
    for(let i = 0;i < n ;i ++){
        let char = s[i]
        if(char === '(' || char === '{' || char === '['){
            stack.push(char)
        }else if(stack[stack.length-1] === tokenMap[char]){
            stack.pop()
        }else {
            return false
        }
    }
    if(stack.length === 0){
        return true
    }else {
        return false
    }
}; 
```

## Merge k Sorted Lists

[problem](https://leetcode.com/problems/merge-k-sorted-lists/ )

[submission detail](https://leetcode.com/submissions/detail/407816643/ )

```javascript 
function mergeLists(a, b) {
  const dummy = {}
  let tail = dummy

  while (a && b) {
    if (a.val < b.val) {
      tail.next = a
      a = a.next
    } else {
      tail.next = b
      b = b.next
    }
    tail = tail.next
  }

  tail.next = a ? a : b

  return dummy.next
}

var mergeKLists = function(lists) {
  if (lists.length === 0) {
    return null
  }

  while (lists.length > 1) {
    let a = lists.shift()
    let b = lists.shift()
    let merged = mergeLists(a,b)
    lists.unshift(merged)
  }

  return lists[0]
}
 
```

## Find the Duplicate Number

[problem](https://leetcode.com/problems/find-the-duplicate-number/ )

[submission detail](https://leetcode.com/submissions/detail/407380319/ )

```javascript 
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
  let slow = 0
  let fast = 0

  // find intersection point
  while (true) {
    slow = nums[slow]
    fast = nums[nums[fast]]
    if(slow === fast) break
  }
  

  // find circle entrace point
  fast = 0
  while (slow !== fast) {
    slow = nums[slow]
    fast = nums[fast]
  }

  return slow
}

 
```

## Linked List Cycle

[problem](https://leetcode.com/problems/linked-list-cycle/ )

[submission detail](https://leetcode.com/submissions/detail/407370860/ )

```javascript 
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if(!head || !head.next) return false
    let slow = head
    let fast = head
    
    while(slow.next && fast.next && fast.next.next){
        slow = slow.next
        fast = fast.next.next
        if(slow.val === fast.val) {
            return true
        }
    }
        
    return false
}; 
```

## Linked List Cycle II

[problem](https://leetcode.com/problems/linked-list-cycle-ii/ )

[submission detail](https://leetcode.com/submissions/detail/407370207/ )

```javascript 
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
  if (!head || !head.next) return null
  let slow = head
  let fast = head
  let hasC = false
  
  while (slow.next && fast.next && fast.next.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) {
      hasC = true
      break
    }
  }

  if (!hasC) {
    return null
  }

  fast = head
  while (slow !== fast) {
    fast = fast.next
    slow = slow.next
  }

  return fast
} 
```

## First Missing Positive

[problem](https://leetcode.com/problems/first-missing-positive/ )

[submission detail](https://leetcode.com/submissions/detail/407301479/ )

```javascript 
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
  const n = nums.length
  for (let i = 0; i < n; i++) {
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      swap(nums, i, nums[i] - 1)
    }
  }


  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1
    }
  }

  return n + 1
}

const swap = (arr, i, j) => {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
 
```

## Majority Element

[problem](https://leetcode.com/problems/majority-element/ )

[submission detail](https://leetcode.com/submissions/detail/407285523/ )

```javascript 
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
  let left = 0
  let right = nums.length - 1
  let mid = Math.floor(nums.length / 2)
  nums.sort((a, b) => a - b)

  if (nums[left] === nums[mid]) {
    return nums[left]
  }
  if (nums[right] === nums[mid]) {
    return nums[right]
  }

  return nums[mid]
}
 
```

## Two Sum

[problem](https://leetcode.com/problems/two-sum/ )

[submission detail](https://leetcode.com/submissions/detail/406609738/ )

```javascript 
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const sortedNums = nums.map((v, i) => ({ v, i }))
  sortedNums.sort((a, b) => a.v - b.v)
  let left = 0
  let right = nums.length - 1

  while (left < right) {
    let sum = sortedNums[left].v + sortedNums[right].v
    if (sum === target) {
      return [sortedNums[left].i, sortedNums[right].i]
    } else if (sum < target) {
      left++
    } else {
      right--
    }
  }
}
 
```

## 3Sum

[problem](https://leetcode.com/problems/3sum/ )

[submission detail](https://leetcode.com/submissions/detail/406603497/ )

```javascript 
var threeSum = function(nums) {
  let res = []
  nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length - 1; i++) {
    if(nums[i] > 0) break
     
    let j = i + 1
    let k = nums.length - 1
    if (i === 0 || nums[i] !== nums[i - 1]) {
      while (j < k) {
        const sum = nums[i] + nums[j] + nums[k]
        if (sum === 0) {
          let nc = [nums[i], nums[j++], nums[k--]]
          res.push(nc)
          while (j < k && nums[j] === nums[j - 1]) j++
        } else if (sum < 0) {
          // < 0
          j++
        } else {
          // > 0
          k--
        }
      }
    }
  }
  return res
} 
```

## Search in Rotated Sorted Array

[problem](https://leetcode.com/problems/search-in-rotated-sorted-array/ )

[submission detail](https://leetcode.com/submissions/detail/373658075/ )

```javascript 
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let low = 0
  let high = nums.length - 1
  
  while(low <= high){
      let mid = parseInt(low + (high - low) / 2)
      
      if(nums[mid] === target) return mid
      
      if(nums[low] <= nums[mid]){ // left sorted
          if(target >= nums[low] && target < nums[mid]) {
              high = mid - 1 
          }else {
              low = mid + 1
          }
      }else { // right sorted
          if(target <= nums[high] && target > nums[mid]) {
              low = mid + 1
          }else {
              high = mid - 1
          }
      }
  }
      
  return -1;
}; 
```

## Merge Two Sorted Lists

[problem](https://leetcode.com/problems/merge-two-sorted-lists/ )

[submission detail](https://leetcode.com/submissions/detail/369661975/ )

```cpp 
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode dummy(INT_MIN);
        ListNode *tail = &dummy;
        
        while(l1 && l2){
            if(l1->val < l2->val){
                tail->next = l1;
                l1 = l1->next;
            }else {
                tail->next = l2;
                l2 = l2->next;
            }
            
            tail = tail->next;
        }
       
        tail->next = l1 ? l1 : l2;
        
        return dummy.next;
    }
}; 
```

## Remove Nth Node From End of List

[problem](https://leetcode.com/problems/remove-nth-node-from-end-of-list/ )

[submission detail](https://leetcode.com/submissions/detail/369661005/ )

```cpp 
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
       ListNode *slow = head, *fast = head;
        
       for(int i = 0 ; i < n ; i++){
           fast = fast->next;
       }
        
       if(!fast){
           return head->next;
       }
        
       while(fast->next){
           slow = slow->next;
           fast = fast->next;
       }
        
       slow->next = slow->next->next;
        
       return head;
    }
}; 
```

## Palindrome Linked List

[problem](https://leetcode.com/problems/palindrome-linked-list/ )

[submission detail](https://leetcode.com/submissions/detail/368720448/ )

```cpp 
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        if(!head || !head->next) {
            return true;
        }
        
        ListNode *fast = head, *slow = head;
        
        while(slow->next && fast->next && fast->next->next){
            slow = slow->next;
            fast = fast->next->next;
        }
        
        // 开始反转前面的列表 从slow节点开始
        ListNode *p,*q,*r;
        p=slow->next;//无论奇偶，slow指针所在位置都是链表1的末结点
        q=p->next;
        p->next=NULL;
        while(q)//翻转链表的后半部分
        {
            r=q->next;
            q->next=p;
            p=q;
            q=r;
        }
        
        ListNode *after = p;
        ListNode *before = head;
        
        while(before && after){
            cout << before->val << endl;
            cout << after->val << endl;
            if(before->val != after->val){
                return false;
            }
            before = before->next;
            after = after->next;
        }
        
        return true;
    }
}; 
```

## Count All Valid Pickup and Delivery Options

[problem](https://leetcode.com/problems/count-all-valid-pickup-and-delivery-options/ )

[submission detail](https://leetcode.com/submissions/detail/367427766/ )

```cpp 
class Solution {
public:
    int countOrders(int n) {
    long long res = 1, cap = 1000000007;
    for (int i=1; i<n+1; ++i) res = res * i % cap;
    for (int i=1; i<n+1; i++) res = res * (i + i -1) % cap;
    return res;
   }
}; 
```

## Find Bottom Left Tree Value

[problem](https://leetcode.com/problems/find-bottom-left-tree-value/ )

[submission detail](https://leetcode.com/submissions/detail/367373795/ )

```javascript 
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function(root) {
    let lastLevel = 0
    let lastLeftValue = 0
    
    const dfs = (node,level) => {
        if (!node) return
        if (level === lastLevel) {
            lastLevel++
            lastLeftValue = node.val
        }
        
        level++
        dfs(node.left, level)
        dfs(node.right, level)
    }
    
    dfs(root,0)
    
    return lastLeftValue
}; 
```

