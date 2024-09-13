/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);

    let dp = new Array(nums.length);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
    }

    return dp[nums.length - 1];
}

// Test cases
console.log(rob([1,2,3,1])); // Expected output: 4
console.log(rob([2,7,9,3,1])); // Expected output: 12
console.log(rob([2,1,1,2])); // Expected output: 4

// 打家劫舍（House Robber）问题解析：

// 1. 问题描述：
// 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
// 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，
// 一夜之内能够偷窃到的最高金额。

// 2. 解题思路：
// 这是一个典型的动态规划问题。对于每个房子，我们有两个选择：偷或不偷。
// - 如果偷当前房子，那么就不能偷前一个房子，但可以偷前前一个房子。
// - 如果不偷当前房子，那么最大金额就是偷到前一个房子为止的最大金额。
// 我们可以用一个数组 dp 来存储到每个房子为止能偷到的最大金额。

// 3. 时间复杂度：
// O(n)，其中 n 是房子的数量。我们只需要遍历一次数组。

// 4. 空间复杂度：
// O(n)，我们使用了一个长度为 n 的 dp 数组。
// 注意：可以优化到 O(1)，因为我们每次只需要前两个状态。

// 5. 注意事项：
// - 需要处理数组长度为 0、1、2 的特殊情况
// - dp[i] 表示到第 i 个房子为止能偷到的最大金额

// 6. 优化方向：
// - 可以将空间复杂度优化到 O(1)，只使用两个变量来存储前两个状态
// - 对于非常长的输入，可以考虑使用 BigInt 来处理大数
