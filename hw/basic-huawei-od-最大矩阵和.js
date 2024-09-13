// 题目描述
// 给定一个二维整数矩阵，要在这个矩阵中选出一个子矩阵，使得这个子矩阵内所有的数字和尽量大，我们把这个子矩阵称为和最大子矩阵，子矩阵的选取原则是原矩阵中一块相互连续的矩形区域。

// 输入描述
// 输入的第一行包含2个整数n, m(1 <= n, m <= 10)，表示一个n行m列的矩阵，下面有n行，每行有m个整数，同一行中，每2个数字之间有1个空格，最后一个数字后面没有空格，所有的数字的在[-1000, 1000]之间。

// 输出描述
// 输出一行一个数字，表示选出的和最大子矩阵内所有的数字和。
/**
 * 计算矩阵的最大子矩阵和
 * @param {number[][]} matrix - 输入的二维矩阵
 * @return {number} - 最大子矩阵和
 */
function maxSubmatrixSum(matrix) {
    const n = matrix.length;
    const m = matrix[0].length;
    let maxSum = -Infinity;

    // 枚举上下边界
    for (let top = 0; top < n; top++) {
        const temp = new Array(m).fill(0);
        for (let bottom = top; bottom < n; bottom++) {
            // 将二维问题转化为一维问题 🐮
            for (let j = 0; j < m; j++) {
                temp[j] += matrix[bottom][j];
            }
            // 在一维数组中寻找最大子数组和
            const currentMax = kadane(temp);
            maxSum = Math.max(maxSum, currentMax);
        }
    }

    return maxSum;
}

/**
 * Kadane算法求一维数组的最大子数组和
 * @param {number[]} arr - 一维数组
 * @return {number} - 最大子数组和
 */
function kadane(arr) {
    let maxSoFar = -Infinity;
    let maxEndingHere = 0;

    for (let i = 0; i < arr.length; i++) {
        maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }

    return maxSoFar;
}

// 测试函数
function runTests() {
    const testCases = [
        {
            input: [
                [1, -2, -3, 4],
                [-5, 6, 7, -8],
                [-9, 10, -11, 12]
            ],
            expected: 23
        },
        {
            input: [
                [-1, -2, -3],
                [-4, -5, -6],
                [-7, -8, -9]
            ],
            expected: -1
        },
        {
            input: [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ],
            expected: 45
        }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log("Input:");
        testCase.input.forEach(row => console.log(row.join(' ')));
        const result = maxSubmatrixSum(testCase.input);
        console.log(`Output: ${result}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Result: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// 运行测试
runTests();
