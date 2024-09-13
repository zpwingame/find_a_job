/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum2(candidates, target) {
    const result = [];
    candidates.sort((a, b) => a - b); // Sort the array to handle duplicates
    
    function backtrack(start, current, remaining) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        
        for (let i = start; i < candidates.length; i++) {
            if (i > start && candidates[i] === candidates[i-1]) continue; // Skip duplicates
            if (candidates[i] > remaining) break; // Stop if current number is greater than remaining
            
            current.push(candidates[i]);
            backtrack(i + 1, current, remaining - candidates[i]);
            current.pop();
        }
    }
    
    backtrack(0, [], target);
    return result;
}

// Test cases
console.log(combinationSum2([10,1,2,7,6,1,5], 8)); // Expected output: [[1,1,6],[1,2,5],[1,7],[2,6]]
console.log(combinationSum2([2,5,2,1,2], 5)); // Expected output: [[1,2,2],[5]]

// 组合总和 II（Combination Sum II）问题解析：

// 1. 问题描述：
// 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
// candidates 中的每个数字在每个组合中只能使用一次。
// 注意：解集不能包含重复的组合。

// 2. 解题思路：
// 这是组合总和问题的变体，主要区别在于：
// - 每个数字只能使用一次
// - 需要处理重复元素
// 我们使用回溯法，并通过以下方式处理重复：
// - 首先对数组进行排序，使得相同的元素相邻
// - 在选择元素时，跳过重复的选择

// 3. 时间复杂度：
// O(2^n)，其中 n 是 candidates 数组的长度。在最坏情况下，我们需要生成所有可能的子集。

// 4. 空间复杂度：
// O(n)，用于递归调用栈和存储当前组合。

// 5. 注意事项：
// - 需要先对数组进行排序，以便处理重复元素
// - 使用 start 参数来确保每个元素只被使用一次
// - 当剩余目标值小于当前候选数时，可以提前结束循环

// 6. 优化方向：
// - 可以在循环中添加剪枝条件，当 candidates[i] > remaining 时提前结束循环
// - 对于大规模输入，可以考虑使用动态规划方法
