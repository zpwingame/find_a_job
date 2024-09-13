/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
    if (prices.length < 2) return 0;
    
    let minPrice = prices[0];
    let maxProfit = 0;
    
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else {
            maxProfit = Math.max(maxProfit, prices[i] - minPrice);
        }
    }
    
    return maxProfit;
}

// Test cases
console.log(maxProfit([7,1,5,3,6,4])); // Expected output: 5
console.log(maxProfit([7,6,4,3,1])); // Expected output: 0

// 买卖股票的最佳时机
// 买卖股票的最佳时机（Best Time to Buy and Sell Stock）问题解析：

// 1. 问题描述：
// 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
// 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
// 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

// 2. 解题思路：
// 我们可以用一次遍历解决这个问题：
// - 遍历价格数组，同时记录到目前为止遇到的最低价格
// - 对于每个价格，计算如果在当前价格卖出能获得的利润，并更新最大利润

// 3. 时间复杂度：
// - O(n)，其中 n 是价格数组的长度。我们只需要遍历一次数组。

// 4. 空间复杂度：
// - O(1)，只使用了常数额外空间。

// 5. 注意事项：
// - 需要处理数组长度小于2的边界情况
// - 初始最大利润应设为0，因为如果无法获利，应返回0

// 6. 优化方向：
// - 这个解法已经是最优的了，both in time and space complexity.
// - 如果允许多次买卖，那将是另一个问题，需要不同的解法。
