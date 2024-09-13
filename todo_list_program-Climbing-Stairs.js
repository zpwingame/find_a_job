/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
    if (n <= 2) return n;
    
    let dp = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}

// Test cases
console.log(climbStairs(2)); // Expected output: 2
console.log(climbStairs(3)); // Expected output: 3
console.log(climbStairs(4)); // Expected output: 5

// 爬楼梯
// 爬楼梯（Climbing Stairs）问题解析：

// 1. 问题描述：
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

// 2. 解题思路：
// 这是一个经典的动态规划问题。关键观察是：
// - 到达第n阶的方法数 = 到达第(n-1)阶的方法数 + 到达第(n-2)阶的方法数
// 这是因为我们可以从(n-1)阶爬1步到达n阶，或者从(n-2)阶爬2步到达n阶

// 3. 时间复杂度：
// - O(n)，我们需要计算到n的每一步

// 4. 空间复杂度：
// - O(n)，我们使用了一个长度为n+1的数组来存储中间结果

// 5. 注意事项：
// - 需要特别处理n <= 2的情况
// - 数组dp的索引从1开始，以便于理解

// 6. 优化方向：
// - 我们可以只使用两个变量而不是一个数组来存储中间结果，这样可以将空间复杂度降到O(1)
// - 对于非常大的n，需要考虑结果可能会溢出的情况
