/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum(candidates, target) {
    const result = [];
    
    function backtrack(current, start, remaining) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        
        if (remaining < 0) {
            return;
        }
        
        for (let i = start; i < candidates.length; i++) {
            current.push(candidates[i]);
            backtrack(current, i, remaining - candidates[i]);
            current.pop();
        }
    }
    
    backtrack([], 0, target);
    return result;
}

// Test cases
console.log(combinationSum([2,3,6,7], 7)); // Expected output: [[2,2,3],[7]]
console.log(combinationSum([2,3,5], 8)); // Expected output: [[2,2,2,2],[2,3,3],[3,5]]
console.log(combinationSum([2], 1)); // Expected output: []

// 组合总和（Combination Sum）问题解析：

// 1. 问题描述：
// 给定一个无重复元素的正整数数组 candidates 和一个正整数 target ，找出 candidates 中所有可以使数字和为目标数 target 的唯一组合。
// candidates 中的数字可以无限制重复被选取。

// 2. 解题思路：
// 这是一个典型的回溯问题。我们使用递归来生成所有可能的组合。
// 对于每个数字，我们可以选择使用它（可以多次使用）或不使用它。

// 3. 时间复杂度：
// O(N^(T/M + 1))，其中 N 是 candidates 数组的长度，T 是目标值，M 是 candidates 中的最小值。

// 4. 空间复杂度：
// O(T/M)，主要是递归调用栈的深度。

// 5. 注意事项：
// - 需要注意在每次递归调用后恢复状态（即移除最后添加的元素）
// - 使用 start 参数来避免重复组合
// - 当剩余目标值小于 0 时，可以提前返回

// 6. 优化方向：
// - 可以先对 candidates 数组进行排序，这样可以在剩余目标值小于当前候选数时提前结束循环
// - 对于大规模输入，可以考虑使用动态规划方法
