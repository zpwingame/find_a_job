// 给定一个循环数组(最后一个元素的下一个元素是数组的第一个元素)，
// 输出每个元素的 下一个更大元素。数字x的下一个更大的元素是按数组遍历顺序，
// 这个数字之后的第一个 比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输 出-1。

// 输入: [1,2,1]
// 输出: [2,-1,2]
// 解释: 第一个 1 的下一个更大的数是 2;
// 数字 2 找不到下一个更大的数;
// 第二个 1 的下一个最大的数需要循环搜索，结果也是 2。
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];
    
    // 遍历两次数组，模拟循环
    for (let i = 0; i < n * 2; i++) {
        const num = nums[i % n];
        
        while (stack.length && nums[stack[stack.length - 1]] < num) {
            result[stack.pop()] = num;
        }
        
        if (i < n) {
            stack.push(i);
        }
    }
    
    return result;
};

// 测试
console.log(nextGreaterElements([1,2,1])); // 输出: [2,-1,2]
console.log(nextGreaterElements([1,2,3,4,3])); // 输出: [2,3,4,-1,4]
