/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function threeSumClosest(nums, target) {
    nums.sort((a, b) => a - b);
    let closestSum = nums[0] + nums[1] + nums[2];

    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const currentSum = nums[i] + nums[left] + nums[right];

            if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
                closestSum = currentSum;
            }

            if (currentSum < target) {
                left++;
            } else if (currentSum > target) {
                right--;
            } else {
                return currentSum; // Found exact match
            }
        }
    }

    return closestSum;
}

// Test cases
console.log(threeSumClosest([-1, 2, 1, -4], 1)); // Output: 2
console.log(threeSumClosest([0, 0, 0], 1)); // Output: 0
console.log(threeSumClosest([1, 1, 1, 0], -100)); // Output: 2
// 最接近的三数之和
// 最接近的三数之和（3Sum Closest）问题解析：

// 1. 问题描述：
// 给定一个包含 n 个整数的数组 nums 和一个目标值 target，找出 nums 中的三个整数，使得它们的和与 target 最接近。
// 返回这三个数的和。假定每组输入只存在唯一答案。

// 2. 解题思路：
// - 首先对数组进行排序，这样可以更容易地控制三数之和的大小。
// - 使用三重指针：固定一个数，然后用双指针寻找另外两个数。
// - 通过比较当前三数之和与目标值的差，不断更新最接近的和。

// 3. 时间复杂度：
// - 排序的时间复杂度为 O(nlogn)
// - 三重循环的时间复杂度为 O(n^2)
// - 总体时间复杂度为 O(n^2)

// 4. 空间复杂度：
// - 除了排序可能使用的额外空间外，算法只使用了常数级别的额外空间
// - 空间复杂度为 O(1)

// 5. 注意事项：
// - 需要注意处理重复元素，以避免不必要的计算
// - 当找到完全匹配的和时，可以直接返回结果
// - 更新最接近和时，要使用绝对值比较

// 6. 优化方向：
// - 可以在循环中加入提前退出的条件，当发现后续的元素不可能产生更接近的和时，提前结束循环
// - 对于特定的输入规模，可以考虑使用哈希表来优化查找过程

