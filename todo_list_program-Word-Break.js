/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
function wordBreak(s, wordDict) {
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    
    const wordSet = new Set(wordDict);
    
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.slice(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[n];
}

// Test cases
console.log(wordBreak("leetcode", ["leet", "code"])); // Expected output: true
console.log(wordBreak("applepenapple", ["apple", "pen"])); // Expected output: true
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"])); // Expected output: false

// 单词拆分（Word Break）问题解析：

// 1. 问题描述：
// 给定一个非空字符串 s 和一个包含非空单词的列表 wordDict，判定 s 是否可以被空格拆分为一个或多个在字典中出现的单词。
// 注意：
// - 拆分时可以重复使用字典中的单词。
// - 你可以假设字典中没有重复的单词。

// 2. 解题思路：
// 这是一个动态规划问题。我们使用一个布尔数组 dp，其中 dp[i] 表示字符串 s 的前 i 个字符是否可以被拆分成字典中的单词。

// 3. 时间复杂度：
// O(n^2 * m)，其中 n 是字符串 s 的长度，m 是检查一个单词是否在字典中的时间（使用 Set 可以将这个时间降到 O(1)）。

// 4. 空间复杂度：
// O(n) 用于 dp 数组，加上 O(m) 用于存储字典中的单词（使用 Set）。

// 5. 注意事项：
// - 使用 Set 来存储字典可以提高查找效率
// - 需要初始化 dp[0] 为 true，表示空字符串总是可以被拆分

// 6. 优化方向：
// - 可以考虑使用记忆化搜索来代替动态规划
// - 对于非常长的输入，可以考虑使用滚动数组来优化空间复杂度
