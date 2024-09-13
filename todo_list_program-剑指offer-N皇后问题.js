/**
 * @param {number} n
 * @return {string[][]}
 */
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));

    function isValid(row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }

        // Check upper-left diagonal
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }

        // Check upper-right diagonal
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }

        return true;
    }

    function backtrack(row) {
        if (row === n) {
            result.push(board.map(row => row.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';
            }
        }
    }

    backtrack(0);
    return result;
}

// Test cases
console.log(solveNQueens(4));
console.log(solveNQueens(1));

// 题目：N皇后
// n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
// 给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。
// 每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

// 解题思路：
// 1. 使用回溯法解决这个问题
// 2. 从第一行开始，尝试在每一列放置皇后
// 3. 每次放置皇后时，检查是否与之前放置的皇后冲突
// 4. 如果不冲突，继续尝试下一行；如果冲突，回溯到上一步，尝试下一列
// 5. 当成功放置 n 个皇后时，将当前解加入结果集

// 时间复杂度：O(N!)，其中 N 是皇后的数量。
// 空间复杂度：O(N)，主要是递归调用栈的开销和存储棋盘的空间。

// 注意：这个问题是一个经典的回溯算法题目。
// 优化：可以使用位运算来优化冲突检查，提高效率。
