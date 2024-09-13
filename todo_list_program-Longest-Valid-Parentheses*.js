/**
 * @param {string} s
 * @return {number}
 */
function longestValidParentheses(s) {
    const stack = [-1];
    let maxLen = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else {
            stack.pop();
            if (stack.length === 0) {
                stack.push(i);
            } else {
                maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
            }
        }
    }

    return maxLen;
}

// Test cases
console.log(longestValidParentheses("(()")); // Expected output: 2
console.log(longestValidParentheses(")()())")); // Expected output: 4
console.log(longestValidParentheses("")); // Expected output: 0

// 最长有效括号
// 最长有效括号（Longest Valid Parentheses）问题解析：

// 1. 问题描述：
// 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。

// 2. 解题思路：
// 我们使用栈来解决这个问题。栈底始终保存当前有效括号串前一个位置的索引。
// - 遇到 '('，将其索引入栈
// - 遇到 ')'：
//   - 如果栈不为空，弹出栈顶元素（与当前 ')' 匹配的 '(' 的索引）
//   - 计算当前有效括号串的长度（当前索引 - 栈顶元素）
//   - 更新最大长度
//   - 如果栈为空，将当前 ')' 的索引入栈（作为下一个有效括号串的前一个位置）

// 3. 时间复杂度：
// O(n)，其中 n 是字符串的长度。我们只需要遍历一次字符串。

// 4. 空间复杂度：
// O(n)，在最坏情况下，我们可能需要将所有的 '(' 都推入栈中。

// 5. 注意事项：
// - 初始化栈时，先放入 -1，这样可以处理整个字符串都是有效括号的情况
// - 需要考虑空字符串的情况

// 6. 优化方向：
// - 可以考虑使用动态规划来解决这个问题，可以将空间复杂度优化到 O(1)
// - 也可以使用两次遍历（从左到右和从右到左）的方法来解决，不需要额外空间
