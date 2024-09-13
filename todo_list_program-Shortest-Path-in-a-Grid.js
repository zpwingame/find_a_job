/**
 * @param {number[][]} grid
 * @return {number}
 */
function shortestPathBinaryMatrix(grid) {
    const n = grid.length;
    if (grid[0][0] === 1 || grid[n-1][n-1] === 1) return -1;
    
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];
    
    const queue = [[0, 0, 1]]; // [row, col, distance]
    grid[0][0] = 1; // Mark as visited
    
    while (queue.length > 0) {
        const [row, col, distance] = queue.shift();
        
        if (row === n - 1 && col === n - 1) return distance;
        
        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;
            
            if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n && grid[newRow][newCol] === 0) {
                queue.push([newRow, newCol, distance + 1]);
                grid[newRow][newCol] = 1; // Mark as visited
            }
        }
    }
    
    return -1; // No path found
}

// Test cases
console.log(shortestPathBinaryMatrix([[0,1],[1,0]])); // Expected output: 2
console.log(shortestPathBinaryMatrix([[0,0,0],[1,1,0],[1,1,0]])); // Expected output: 4
console.log(shortestPathBinaryMatrix([[1,0,0],[1,1,0],[1,1,0]])); // Expected output: -1

// 图的最短路径（Shortest Path in a Grid）问题解析：

// 1. 问题描述：
// 给定一个 n x n 的二进制矩阵 grid，找出从左上角到右下角的最短路径的长度。
// 路径可以从任何 8 个相邻方向移动（水平，垂直，对角线），但只能穿过值为 0 的单元格。
// 如果不存在这样的路径，返回 -1。

// 2. 解题思路：
// 使用广度优先搜索（BFS）来找到最短路径。BFS 保证在找到目标时，路径是最短的。

// 3. 时间复杂度：
// O(n^2)，其中 n 是矩阵的边长。在最坏情况下，我们可能需要访问矩阵中的所有单元格。

// 4. 空间复杂度：
// O(n^2)，用于队列和访问标记。

// 5. 注意事项：
// - 需要检查起点和终点是否为 0
// - 使用方向数组来简化 8 个方向的移动
// - 将访问过的单元格标记为 1，以避免重复访问

// 6. 优化方向：
// - 可以使用双向 BFS 来进一步优化大规模输入的性能
// - 如果允许修改输入，可以直接在 grid 上标记访问，节省额外的空间
