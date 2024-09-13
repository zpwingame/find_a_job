// 题目描述
// 均衡串定义：字符串中只包含两种字符，且这两种字符的个数相同。

// 给定一个均衡字符串，请给出可分割成新的均衡子串的最大个数。

// 约定：字符串中只包含大写的 X 和 Y 两种字符。

// 输入描述
// 输入一个均衡串。

// 字符串的长度：[2， 10000]。
// 给定的字符串均为均衡字符串
// 输出描述
// 输出可分割成新的均衡子串的最大个数。

// 备注
// 分割后的子串，是原字符串的连续子串


// 输入	XXYYXY
// 输出	2
// 说明	XXYYXY可分割为2个均衡子串，分别为：XXYY、XY
/**
 * 计算可分割成新的均衡子串的最大个数
 * @param {string} s - 输入的均衡字符串
 * @return {number} - 可分割的最大均衡子串个数
 */
function maxBalancedSubstrings(s) {
    let count = 0;
    let xCount = 0;
    let yCount = 0;

    for (let char of s) {
        if (char === 'X') {
            xCount++;
        } else if (char === 'Y') {
            yCount++;
        }

        if (xCount === yCount) {
            count++;
            xCount = 0;
            yCount = 0;
        }
    }

    return count;
}

// 测试函数
function runTests() {
    const testCases = [
        { input: "XXYYXY", expected: 2 },
        { input: "XYXY", expected: 2 },
        { input: "XXYY", expected: 1 },
        { input: "XYXYXYXY", expected: 4 },
        { input: "XXYXYY", expected: 1 },
        { input: "XYXXYY", expected: 2 }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`Input: "${testCase.input}"`);
        const result = maxBalancedSubstrings(testCase.input);
        console.log(`Output: ${result}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Result: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// 运行测试
runTests();
