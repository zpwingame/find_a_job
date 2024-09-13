// 题目描述
// 给定一个数组，编写一个函数来计算它的最大N个数与最小N个数的和。你需要对数组进行去重。

// 说明：

// 数组中数字范围[0, 1000]
// 最大N个数与最小N个数不能有重叠，如有重叠，输入非法返回-1
// 输入非法返回-1
// 输入描述
// 第一行输入M， M标识数组大小
// 第二行输入M个数，标识数组内容
// 第三行输入N，N表达需要计算的最大、最小N个数
// 输出描述
// 输出最大N个数与最小N个数的和
/**
 * 计算最大N个数与最小N个数的和
 * @param {number[]} arr - 输入的数组
 * @param {number} N - 需要计算的最大、最小N个数
 * @return {number} - 最大N个数与最小N个数的和，如果输入非法则返回-1
 */
function sumOfMaxAndMinN(arr, N) {
    // 去重并排序
    const uniqueSortedArr = [...new Set(arr)].sort((a, b) => a - b);
    
    // 检查输入是否合法
    if (N * 2 > uniqueSortedArr.length) {
        return -1;
    }
    
    // 计算最小N个数之和
    const minSum = uniqueSortedArr.slice(0, N).reduce((sum, num) => sum + num, 0);
    
    // 计算最大N个数之和
    const maxSum = uniqueSortedArr.slice(-N).reduce((sum, num) => sum + num, 0);
    
    return minSum + maxSum;
}
// 测试用例
function runTests() {
    const testCases = [
        {
            M: 5,
            arr: [3, 2, 1, 4, 5],
            N: 2,
            expected: 10
        },
        {
            M: 7,
            arr: [1, 2, 3, 4, 5, 6, 7],
            N: 3,
            expected: 24
        },
        {
            M: 6,
            arr: [1, 1, 2, 3, 4, 5],
            N: 2,
            expected: 9
        },
        {
            M: 4,
            arr: [1, 2, 3, 4],
            N: 2,
            expected: -1
        },
        {
            M: 8,
            arr: [1, 1, 2, 2, 3, 3, 4, 4],
            N: 2,
            expected: 7
        }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`Input: M = ${testCase.M}, arr = [${testCase.arr.join(', ')}], N = ${testCase.N}`);
        const result = sumOfMaxAndMinN(testCase.arr, testCase.N);
        console.log(`Output: ${result}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Result: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// 运行测试
runTests();
