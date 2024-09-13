/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
    const result = [];
    
    // Helper function for backtracking
    function backtrack(current, remaining) {
        if (remaining.length === 0) {
            result.push([...current]);
            return;
        }
        
        for (let i = 0; i < remaining.length; i++) {
            current.push(remaining[i]);
            backtrack(current, remaining.slice(0, i).concat(remaining.slice(i + 1)));
            current.pop();
        }
    }
    
    backtrack([], nums);
    return result;
}

// Test cases
console.log(permute([1,2,3])); // Expected output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
console.log(permute([0,1])); // Expected output: [[0,1],[1,0]]
console.log(permute([1])); // Expected output: [[1]]

// 全排列（Permutations）问题解析：

// 1. 问题描述：
// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

// 2. 解题思路：
// 这是一个典型的回溯问题。我们使用递归来生成所有可能的排列。
// 对于每个数字，我们尝试将其放在当前位置，然后递归地排列剩余的数字。

// 3. 时间复杂度：
// O(n!)，其中 n 是数组的长度。这是因为有 n! 种可能的排列。

// 4. 空间复杂度：
// O(n)，用于递归调用栈和存储当前排列。

// 5. 注意事项：
// - 需要注意在每次递归调用后恢复状态（即移除最后添加的元素）
// - 使用 slice() 方法创建新的数组，避免修改原数组

// 6. 优化方向：
// - 对于大规模输入，可以考虑使用迭代方法代替递归
// - 如果允许修改原数组，可以通过交换元素来避免创建新数组，从而优化空间使用
