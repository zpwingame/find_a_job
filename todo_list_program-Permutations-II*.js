/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permuteUnique(nums) {
    const result = [];
    nums.sort((a, b) => a - b); // Sort the array to handle duplicates
    
    function backtrack(current, used) {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (used[i] || (i > 0 && nums[i] === nums[i-1] && !used[i-1])) continue;
            
            used[i] = true;
            current.push(nums[i]);
            backtrack(current, used);
            current.pop();
            used[i] = false;
        }
    }
    
    backtrack([], new Array(nums.length).fill(false));
    return result;
}

// Test cases
console.log(permuteUnique([1,1,2])); // Expected output: [[1,1,2],[1,2,1],[2,1,1]]
console.log(permuteUnique([1,2,3])); // Expected output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// 全排列 II（Permutations II）问题解析：

// 1. 问题描述：
// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

// 2. 解题思路：
// 这是全排列问题的变体，主要区别在于需要处理重复元素。
// 我们使用回溯法，并通过以下方式处理重复：
// - 首先对数组进行排序，使得相同的元素相邻
// - 在选择元素时，跳过重复的选择

// 3. 时间复杂度：
// O(n * n!)，其中 n 是数组的长度。虽然有重复元素，但在最坏情况下（所有元素都不同）仍需要生成 n! 个排列。

// 4. 空间复杂度：
// O(n)，用于递归调用栈和存储当前排列。

// 5. 注意事项：
// - 需要使用一个 used 数组来标记已经使用过的元素
// - 关键是要跳过重复的选择：如果当前元素与前一个元素相同，且前一个元素未被使用，则跳过当前元素

// 6. 优化方向：
// - 对于大规模输入，可以考虑使用迭代方法代替递归
// - 如果允许修改原数组，可以通过交换元素来避免使用额外的 used 数组
