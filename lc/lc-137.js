// 来源：LeetCode第137题
// 难度：中等

// 给你一个整数数组 nums ，除某个元素仅出现一次外，其余每个元素都恰出现三次。请你找出并返回那个只出现了一次的元素。



// 你必须设计并实现线性时间复杂度的算法且使用常数级空间来解决此问题。


// 示例1：
// 输入：nums = [2,2,3,2]

// 输出：3

// 示例2：
// 输入：nums = [0,1,0,1,0,1,99]

// 输出：99


// 1 <= nums.length <= 3 * 10^4

// -2^31 <= nums[i] <= 2^31 - 1

// nums中，除某个元素仅出现一次外，其余每个元素都恰出现三次
/**
 * @param {number[]} nums
 * @return {number}
 */
// var singleNumber = function(nums) {
//     let result = 0;
//     for (let i = 0; i < 32; i++) {
//         let sum = 0;
//         for (let num of nums) {
//             sum += (num >> i) & 1;
//         }
//         result |= (sum % 3) << i;
//     }
//     return result >>> 0;
// };

// Test cases
// console.log(singleNumber([2,2,3,2])); // Expected output: 3
// console.log(singleNumber([0,1,0,1,0,1,99])); // Expected output: 99

// Another solution using a hash map
var singleNumber = function(nums) {
    const count = new Map();
    
    // Count occurrences of each number
    for (const num of nums) {
        count.set(num, (count.get(num) || 0) + 1);
    }
    
    // Find the number that appears only once
    for (const [num, frequency] of count) {
        if (frequency === 1) {
            return num;
        }
    }
    
    // This line should never be reached if the input is valid
    return null;
};

// Test cases
console.log(singleNumber([2,2,3,2])); // Expected output: 3
console.log(singleNumber([0,1,0,1,0,1,99])); // Expected output: 99

// Note: This solution has O(n) time complexity and O(n) space complexity,
// which doesn't meet the constant space requirement of the original problem.
// However, it's a more intuitive approach and can be useful in scenarios
// where space complexity is not a constraint.

