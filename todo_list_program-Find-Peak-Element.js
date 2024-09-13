/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        
        if (nums[mid] < nums[mid + 1]) {
            // Peak is on the right side
            left = mid + 1;
        } else {
            // Peak is on the left side or at mid
            right = mid;
        }
    }
    
    return left;
};

// Test cases
console.log(findPeakElement([1,2,3,1])); // Expected output: 2
console.log(findPeakElement([1,2,1,3,5,6,4])); // Expected output: 5

// Explanation:
// This solution uses a binary search approach to find a peak element.
// 1. We initialize two pointers, left and right, to the start and end of the array.
// 2. We continue the search while left < right.
// 3. We calculate the middle index mid.
// 4. If nums[mid] < nums[mid + 1], we know a peak exists on the right side, so we move left to mid + 1.
// 5. Otherwise, a peak exists on the left side or at mid, so we move right to mid.
// 6. The search continues until left and right converge, which will be at a peak element.
// 7. We return left, which is the index of a peak element.

// Time complexity: O(log n), where n is the length of the input array.
// Space complexity: O(1), as we only use a constant amount of extra space.

// 寻找峰值 (Find Peak Element)

// 这个问题在中文中通常被称为"寻找峰值"。
// 峰值元素是指其值大于左右相邻值的元素。

// 题目描述：
// 给定一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回任何一个峰值所在位置即可。
// 你可以假设 nums[-1] = nums[n] = -∞。

// 示例:
// 输入: nums = [1,2,3,1]
// 输出: 2
// 解释: 3 是峰值元素，你的函数应该返回其索引 2。

// 输入: nums = [1,2,1,3,5,6,4]
// 输出: 1 或 5 
// 解释: 你的函数可以返回索引 1，其峰值元素为 2；或者返回索引 5，其峰值元素为 6。

// 要求：你的解法应该是 O(log n) 复杂度的。

