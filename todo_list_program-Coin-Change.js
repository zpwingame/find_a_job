/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
function coinChange(coins, amount) {
    // Initialize dp array with amount + 1 (which is larger than the max possible value)
    const dp = new Array(amount + 1).fill(amount + 1);
    
    // Base case: 0 coins needed to make amount 0
    dp[0] = 0;
    
    // Iterate through all amounts from 1 to amount
    for (let i = 1; i <= amount; i++) {
        // For each coin, check if it can contribute to the current amount
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    // If dp[amount] is still amount + 1, it means no solution was found
    return dp[amount] > amount ? -1 : dp[amount];
}

// Test cases
console.log(coinChange([1, 2, 5], 11)); // Expected output: 3
console.log(coinChange([2], 3)); // Expected output: -1
console.log(coinChange([1], 0)); // Expected output: 0

// 零钱兑换
// 零钱兑换（Coin Change）问题解析：

// 1. 问题描述：
// 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
// 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
// 你可以认为每种硬币的数量是无限的。

// 2. 解题思路：
// 这是一个典型的动态规划问题。我们可以使用一维DP数组，其中dp[i]表示凑成金额i所需的最少硬币数。
// 对于每个金额i，我们遍历每种硬币，如果当前硬币面值不大于i，我们就可以用这个硬币。
// 状态转移方程：dp[i] = min(dp[i], dp[i - coin] + 1)

// 3. 时间复杂度：
// O(amount * len(coins))，我们需要计算amount个状态，每个状态需要遍历所有硬币。

// 4. 空间复杂度：
// O(amount)，我们使用了一个长度为amount+1的DP数组。

// 5. 注意事项：
// - 需要初始化DP数组为一个较大的值（如amount+1）
// - 需要特别处理无解的情况
// - 基础情况：dp[0] = 0，因为凑成金额0不需要任何硬币

// 6. 优化方向：
// - 可以考虑使用贪心算法进行优化，但需要注意贪心算法并不总是能得到最优解
// - 如果硬币面值较小且amount较大，可以考虑使用完全背包问题的优化方法
