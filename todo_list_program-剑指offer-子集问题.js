/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets(nums) {
    const result = [];
    
    function backtrack(start, currentSubset) {
        result.push([...currentSubset]);
        
        for (let i = start; i < nums.length; i++) {
            currentSubset.push(nums[i]);
            backtrack(i + 1, currentSubset);
            currentSubset.pop();
        }
    }
    
    backtrack(0, []);
    return result;
}

// Test cases
console.log(subsets([1,2,3])); // Expected output: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
console.log(subsets([0])); // Expected output: [[], [0]]

// 题目：子集
// 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
// 解集不能包含重复的子集。

// 解题思路：
// 1. 使用回溯法来生成所有可能的子集
// 2. 从空集开始，逐步添加元素，生成新的子集
// 3. 每次添加元素后，继续递归生成包含该元素的子集
// 4. 递归结束后，回溯（删除最后添加的元素），尝试添加下一个元素

// 时间复杂度：O(2^n)，其中 n 是数组的长度。因为对于每个元素，我们有"选"和"不选"两种选择。
// 空间复杂度：O(n)，递归调用栈的深度最多为 n。

// 注意：这个解法使用了回溯法，它能有效地生成所有可能的子集。
// 对于包含重复元素的数组，需要先排序并略微修改算法以跳过重复元素。
