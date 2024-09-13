/**
 * @param {number[]} nums
 * @return {number}
 */
function findRepeatNumber(nums) {
    const set = new Set();
    for (let num of nums) {
        if (set.has(num)) {
            return num;
        }
        set.add(num);
    }
    return -1; // If no duplicate is found
}

// Test cases
console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3])); // Expected output: 2 or 3
console.log(findRepeatNumber([3, 4, 2, 1, 1, 0])); // Expected output: 1
console.log(findRepeatNumber([1, 2, 3, 4, 5])); // Expected output: -1

// 题目：数组中重复的数字
// 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。
// 数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。
// 请找出数组中任意一个重复的数字。

// 解题思路：
// 1. 使用Set数据结构来存储已经遇到的数字
// 2. 遍历数组，对每个数字：
//    - 如果这个数字已经在Set中，说明找到了重复的数字，直接返回
//    - 否则，将这个数字加入Set
// 3. 如果遍历完整个数组都没有找到重复的数字，返回-1

// 时间复杂度：O(n)，其中n是数组的长度。我们只需要遍历一次数组。
// 空间复杂度：O(n)，在最坏的情况下，我们需要将所有数字都存入Set。

// 注意：这个解法会修改原数组。如果不允许修改原数组，可以考虑使用额外的空间（如Set）来记录出现过的数字。
