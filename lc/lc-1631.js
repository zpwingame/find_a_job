// 你准备参加一场远足活动。

// 给你一个二维 rows x columns 的地图 heights，其中 heights[row][col] 表示格子 (row, col) 的高度。

// 一开始你在最左上角的格子 (0, 0) ，且你希望去最右下角的格子 (rows-1, columns-1) （注意下标从 0 开始编号）。

// 你每次可以往「上，下，左，右」四个方向之一移动，你想要找到耗费体力最小的一条路径。

// 一条路径耗费的「体力值」是路径上相邻格子之间「高度差绝对值」的「最大值」决定的。

// 请你返回从左上角走到右下角的最小体力消耗值。
// 输入：heights = [[1,2,2],[3,8,2],[5,3,5]]

// 输出：2

// 解释：路径 [1,3,5,3,5] 连续格子的差值绝对值最大为 2 。
// 这条路径比路径 [1,2,2,2,5] 更优，因为另一条路径差值最大值为 3 。
/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function(heights) {
    const rows = heights.length;
    const cols = heights[0].length;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    // Binary search for the minimum effort
    let left = 0;
    let right = 1000000; // Maximum possible height difference
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (canReachDestination(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
    
    function canReachDestination(effort) {
        const queue = [[0, 0]];
        const visited = new Set(['0,0']);
        
        while (queue.length > 0) {
            const [row, col] = queue.shift();
            
            if (row === rows - 1 && col === cols - 1) {
                return true;
            }
            
            for (const [dx, dy] of directions) {
                const newRow = row + dx;
                const newCol = col + dy;
                
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                    const newEffort = Math.abs(heights[newRow][newCol] - heights[row][col]);
                    if (newEffort <= effort && !visited.has(`${newRow},${newCol}`)) {
                        queue.push([newRow, newCol]);
                        visited.add(`${newRow},${newCol}`);
                    }
                }
            }
        }
        
        return false;
    }
};

// Test the function
const heights = [[1,2,2],[3,8,2],[5,3,5]];
console.log(minimumEffortPath(heights)); // Expected output: 2
