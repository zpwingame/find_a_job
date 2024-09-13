/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix) {
    const n = matrix.length;
    
    // Step 1: Transpose the matrix
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    
    // Step 2: Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}

// Test cases
let matrix1 = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];
rotate(matrix1);
console.log(matrix1);
// Output: [[7,4,1],[8,5,2],[9,6,3]]

let matrix2 = [
    [5,1,9,11],
    [2,4,8,10],
    [13,3,6,7],
    [15,14,12,16]
];
rotate(matrix2);
console.log(matrix2);
// Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

// 旋转图像
// 旋转图像（Rotate Image）问题解析：

// 1. 问题描述：
// 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
// 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

// 2. 解题思路：
// 这个问题可以通过两步来解决：
// - 首先，沿着主对角线（左上到右下）翻转矩阵。这步操作被称为矩阵转置。
// - 然后，翻转每一行。

// 3. 时间复杂度：
// - 我们遍历矩阵两次，每次都是 O(n^2) 的操作
// - 总体时间复杂度为 O(n^2)，其中 n 是矩阵的边长

// 4. 空间复杂度：
// - 我们直接在原矩阵上进行修改，不使用额外的空间
// - 空间复杂度为 O(1)

// 5. 注意事项：
// - 在进行矩阵转置时，只需要遍历矩阵的上半部分（或下半部分）
// - 使用解构赋值可以方便地交换元素

// 6. 优化方向：
// - 这个解法已经是最优的了，因为我们必须访问每个元素至少一次
// - 如果允许使用额外空间，可以考虑一次遍历直接旋转到正确位置，但这不符合题目的原地修改要求
