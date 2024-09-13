/**
 * @param {string} s
 * @return {string}
 */
function replaceSpace(s) {
    return s.split(' ').join('%20');
}

// Test cases
console.log(replaceSpace("We are happy.")); // Expected output: "We%20are%20happy."
console.log(replaceSpace("Hello World")); // Expected output: "Hello%20World"
console.log(replaceSpace("   ")); // Expected output: "%20%20%20"

// 题目：替换空格
// 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

// 解题思路：
// 1. 使用 JavaScript 的 split() 方法将字符串按空格分割成数组
// 2. 使用 join() 方法将数组元素用 '%20' 连接成新的字符串

// 时间复杂度：O(n)，其中 n 是字符串的长度。split() 和 join() 方法都需要遍历整个字符串。
// 空间复杂度：O(n)，需要创建一个新的字符串来存储结果。

// 注意：这个方法在 JavaScript 中非常简洁高效，但在其他语言中可能需要不同的实现方式。
// 例如，在一些语言中，可能需要先计算空格的数量，然后从后向前遍历字符串来实现原地替换。
