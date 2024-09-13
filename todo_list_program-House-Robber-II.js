/**
 * @param {number[]} nums
 * @return {number}
 */
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);

    // Helper function to rob a simple line of houses
    function robSimple(houses) {
        let prev1 = 0, prev2 = 0;
        for (let num of houses) {
            let temp = prev1;
            prev1 = Math.max(prev2 + num, prev1);
            prev2 = temp;
        }
        return prev1;
    }

    // Rob houses 0 to n-2 (excluding the last house)
    let max1 = robSimple(nums.slice(0, -1));
    // Rob houses 1 to n-1 (excluding the first house)
    let max2 = robSimple(nums.slice(1));

    return Math.max(max1, max2);
}

// Test cases
console.log(rob([2,3,2])); // Expected output: 3
console.log(rob([1,2,3,1])); // Expected output: 4
console.log(rob([1,2,3])); // Expected output: 3

// 打家劫舍 II（House Robber II）问题解析：

// 1. 问题描述：
// 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。
// 同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。
// 给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。

// 2. 解题思路：
// 这个问题是"打家劫舍"问题的变种。主要区别在于房屋首尾相连。我们可以将问题分解为两个子问题：
// - 偷窃房屋 0 到 n-2（不偷最后一个房屋）
// - 偷窃房屋 1 到 n-1（不偷第一个房屋）
// 然后取这两种情况的最大值。

// 3. 时间复杂度：
// O(n)，其中 n 是房子的数量。我们需要遍历两次数组。

// 4. 空间复杂度：
// O(1)，我们只使用了常数额外空间。

// 5. 注意事项：
// - 需要处理数组长度为 0、1、2 的特殊情况
// - 使用一个辅助函数来处理普通的"打家劫舍"问题

// 6. 优化方向：
// - 可以考虑使用动态规划来进一步优化空间复杂度
// - 对于非常长的输入，可以考虑使用 BigInt 来处理大数
