// 题目：

// 给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 k[0],k[1]...k[m-1] 。请问k[0]*k[1]*...*k[m-1]可能的最大乘积是多少？例如，当绳子的长度是 8 时，我们把它剪成长度分别为 2、3、3 的三段，此时得到的最大乘积是 18。

// 示例1：

// 输入: 2 输出: 1 解释: 2 = 1 + 1, 1 × 1 = 1

// 示例2：

// 输入: 10 输出: 36 解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36

// 提示：

/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function(n) {
    if (n <= 3) return n - 1;
    
    const quotient = Math.floor(n / 3);
    const remainder = n % 3;
    
    if (remainder === 0) {
        return Math.pow(3, quotient);
    } else if (remainder === 1) {
        return Math.pow(3, quotient - 1) * 4;
    } else {
        return Math.pow(3, quotient) * 2;
    }
};

// 动态规划解法
var cuttingRope = function(n) {
    if (n <= 3) return n - 1;
    
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 1;
    dp[3] = 2;
    
    for (let i = 4; i <= n; i++) {
        for (let j = 1; j <= Math.floor(i / 2); j++) {
            dp[i] = Math.max(dp[i], Math.max(j, dp[j]) * Math.max(i - j, dp[i - j]));
        }
    }
    
    return dp[n];
};

// 测试
console.log(cuttingRope(2));  // 应输出 1
console.log(cuttingRope(10)); // 应输出 36

