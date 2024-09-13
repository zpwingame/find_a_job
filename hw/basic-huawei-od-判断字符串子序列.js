// 题目描述
// 给定字符串 target和 source，判断 target是否为 source 的子序列。

// 你可以认为target和 source 中仅包含英文小写字母。

// 字符串 source 可能会很长（长度~=500,000），而 target是个短字符串（长度<=100)。

// 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。

// （例如，”abc”是”aebycd”的一个子序列，而”ayb”不是）。

// 请找出最后一个子序列的起始位置。

// 输入描述
// 第一行为target，短字符串（长度 <=100）
// 第二行为source，长字符串（长度 ~= 500,000）

// 输出描述
// 最后一个子序列的起始位置，即最后一个子序列首字母的下标

// 备注
// 若在source中找不到target，则输出-1
function findLastSubsequence(target, source) {
    let targetIndex = target.length - 1;
    let sourceIndex = source.length - 1;
    let lastStartIndex = -1;

    while (sourceIndex >= 0 && targetIndex >= 0) {
        if (source[sourceIndex] === target[targetIndex]) {
            if (targetIndex === 0) {
                lastStartIndex = sourceIndex;
            }
            targetIndex--;
        }
        sourceIndex--;
    }

    return lastStartIndex;
}

// Test function
function runTests() {
    const testCases = [
        { target: "abc", source: "abcaybec", expected: 3 },
        { target: "abc", source: "acbaebc", expected: 4 },
        { target: "axc", source: "ahbgdc", expected: -1 },
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`Target: "${testCase.target}"`);
        console.log(`Source: "${testCase.source}"`);
        const result = findLastSubsequence(testCase.target, testCase.source);
        console.log(`Result: ${result}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Status: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// Run the tests
runTests();
