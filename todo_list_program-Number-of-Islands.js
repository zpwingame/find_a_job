/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(grid, i, j);
            }
        }
    }
    
    return count;
}

function dfs(grid, i, j) {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] === '0') {
        return;
    }
    
    grid[i][j] = '0';  // Mark as visited
    
    dfs(grid, i+1, j);  // Down
    dfs(grid, i-1, j);  // Up
    dfs(grid, i, j+1);  // Right
    dfs(grid, i, j-1);  // Left
}

// Test cases
console.log(numIslands([
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
])); // Expected output: 1

console.log(numIslands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
])); // Expected output: 3

// 岛屿数量
// 岛屿数量（Number of Islands）问题解析：

// 1. 问题描述：
// 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
// 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

// 2. 解题思路：
// 我们可以使用深度优先搜索（DFS）来解决这个问题：
// - 遍历整个网格
// - 当我们遇到一个 '1'，我们将岛屿计数器加1，并使用DFS将与之相连的所有 '1' 标记为 '0'
// - 继续遍历直到处理完所有的格子

// 3. 时间复杂度：
// - 我们需要访问每个格子一次，因此时间复杂度为O(m*n)，其中m和n是网格的行数和列数

// 4. 空间复杂度：
// - 在最坏情况下（整个网格都是陆地），DFS的递归调用栈的深度可能达到m*n，因此空间复杂度为O(m*n)

// 5. 注意事项：
// - 需要处理网格为空的边界情况
// - 在DFS过程中，需要检查是否越界

// 6. 优化方向：
// - 可以考虑使用并查集（Union-Find）来解决这个问题，这可能在某些情况下更高效
// - 如果要节省空间，可以考虑使用BFS（广度优先搜索）来代替DFS，这样可以避免递归调用栈的开销
