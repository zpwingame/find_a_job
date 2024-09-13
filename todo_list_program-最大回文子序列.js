/**
 * @param {string} s
 * @return {number}
 */
function longestPalindromeSubseq(s) {
    const n = s.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));
    
    // Base case: palindromes of length 1
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }
    
    // Fill the dp table
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            let j = i + len - 1;
            if (s[i] === s[j] && len === 2) {
                dp[i][j] = 2;
            } else if (s[i] === s[j]) {
                dp[i][j] = dp[i+1][j-1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[0][n-1];
}

// Test cases
console.log(longestPalindromeSubseq("bbbab")); // Expected output: 4
console.log(longestPalindromeSubseq("cbbd")); // Expected output: 2

// 题目：最长回文子序列
// 给定一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。
// 可以假设 s 的最大长度为 1000 。

// 解题思路：
// 1. 使用动态规划来解决这个问题
// 2. 创建一个二维 DP 表，dp[i][j] 表示 s[i] 到 s[j] 之间的最长回文子序列的长度
// 3. base case: 对于长度为 1 的子串，最长回文子序列长度为 1
// 4. 状态转移:
//    - 如果 s[i] === s[j]，则 dp[i][j] = dp[i+1][j-1] + 2
//    - 否则，dp[i][j] = Math.max(dp[i+1][j], dp[i][j-1])
// 5. 最终结果存储在 dp[0][n-1] 中，其中 n 是字符串的长度

// 时间复杂度：O(n^2)，其中 n 是字符串的长度
// 空间复杂度：O(n^2)，需要一个 n x n 的 DP 表
// 暴力法实现最长回文子序列
function longestPalindromeSubseqBruteForce(s) {
    const n = s.length;
    
    // 生成所有可能的子序列
    function generateSubsequences(str) {
        const result = [''];
        for (let i = 0; i < str.length; i++) {
            const len = result.length;
            for (let j = 0; j < len; j++) {
                result.push(result[j] + str[i]);
            }
        }
        return result;
    }
    
    // 检查是否为回文
    function isPalindrome(str) {
        let left = 0;
        let right = str.length - 1;
        while (left < right) {
            if (str[left] !== str[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
    
    const subsequences = generateSubsequences(s);
    let maxLength = 0;
    
    for (const subseq of subsequences) {
        if (isPalindrome(subseq) && subseq.length > maxLength) {
            maxLength = subseq.length;
        }
    }
    
    return maxLength;
}

// 测试暴力法
console.log(longestPalindromeSubseqBruteForce("bbbab")); // Expected output: 4
console.log(longestPalindromeSubseqBruteForce("cbbd")); // Expected output: 2

// 注意：暴力法的时间复杂度为 O(2^n * n)，其中 n 是字符串的长度。
// 对于长度较大的字符串，这种方法会非常慢，不适用于实际问题。
// 它仅用于演示和对比with动态规划方法的效率差异。
