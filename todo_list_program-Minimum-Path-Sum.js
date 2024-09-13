/**
 * @param {number[][]} grid
 * @return {number}
 */
function minPathSum(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }
    
    const m = grid.length;
    const n = grid[0].length;
    
    // Create a DP table
    const dp = Array(m).fill().map(() => Array(n).fill(0));
    
    // Initialize the first cell
    dp[0][0] = grid[0][0];
    
    // Initialize the first row
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j-1] + grid[0][j];
    }
    
    // Initialize the first column
    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i-1][0] + grid[i][0];
    }
    
    // Fill the DP table
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
        }
    }
    
    // Return the minimum path sum
    return dp[m-1][n-1];
}

// Test cases
console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]])); // Expected output: 7
console.log(minPathSum([[1,2,3],[4,5,6]])); // Expected output: 12

// 最小路径和
// 最小路径和（Minimum Path Sum）问题解析：

// 1. 问题描述：
// 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
// 说明：每次只能向下或者向右移动一步。

// 2. 解题思路：
// 这是一个典型的动态规划问题。我们可以使用一个二维DP表来存储到达每个位置的最小路径和。
// 对于任意位置(i,j)，到达它的最小路径和为：
// dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]

// 3. 时间复杂度：
// O(m*n)，其中m和n分别是网格的行数和列数。我们需要填充整个DP表。

// 4. 空间复杂度：
// O(m*n)，我们使用了一个m*n的DP表来存储中间结果。

// 5. 注意事项：
// - 需要特别处理第一行和第一列的情况
// - 需要处理输入为空或无效的边界情况

// 6. 优化方向：
// - 我们可以直接在原grid上进行修改，而不使用额外的DP表，这样可以将空间复杂度优化到O(1)
// - 如果只需要最终结果而不需要保留原始数据，这种方法特别有用
