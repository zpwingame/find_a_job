/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
function exist(board, word) {
    const m = board.length;
    const n = board[0].length;
    
    // Helper function for DFS
    function dfs(i, j, k) {
        if (k === word.length) return true;
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[k]) return false;
        
        const temp = board[i][j];
        board[i][j] = '#'; // Mark as visited
        
        const found = dfs(i+1, j, k+1) || dfs(i-1, j, k+1) || dfs(i, j+1, k+1) || dfs(i, j-1, k+1);
        
        board[i][j] = temp; // Restore the original character
        return found;
    }
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfs(i, j, 0)) return true;
        }
    }
    
    return false;
}

// Test cases
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")); // Expected output: true
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE")); // Expected output: true
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB")); // Expected output: false

// 单词搜索（Word Search）问题解析：

// 1. 问题描述：
// 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。
// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中"相邻"单元格是那些水平相邻或垂直相邻的单元格。
// 同一个单元格内的字母不允许被重复使用。

// 2. 解题思路：
// 这是一个典型的回溯（或深度优先搜索DFS）问题。我们需要从每个格子开始，尝试匹配单词的每个字符。
// 如果当前字符匹配，我们就继续搜索下一个字符；如果不匹配，我们就回溯到上一个状态。

// 3. 时间复杂度：
// O(m*n*4^L)，其中 m 和 n 是网格的维度，L 是单词的长度。
// 对于每个格子，我们可能需要探索 4 个方向，最多 L 次。

// 4. 空间复杂度：
// O(L)，其中 L 是单词的长度。这是由于递归调用栈的深度。

// 5. 注意事项：
// - 需要标记已访问的格子，以避免重复使用
// - 在回溯时需要恢复格子的原始字符
// - 需要检查边界条件和字符匹配

// 6. 优化方向：
// - 可以提前检查单词中的字符是否都在网格中出现，如果有字符不在网格中，可以直接返回 false
// - 对于大规模的网格，可以考虑使用并行处理来加速搜索过程
