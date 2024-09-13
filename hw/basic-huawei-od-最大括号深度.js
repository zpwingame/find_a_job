// 题目描述
// 现有一字符串仅由 ‘(‘，’)’，'{‘，’}’，'[‘，’]’六种括号组成。

// 若字符串满足以下条件之一，则为无效字符串：

// ①任一类型的左右括号数量不相等；

// ②存在未按正确顺序（先左后右）闭合的括号。

// 输出括号的最大嵌套深度，若字符串无效则输出0。

// 0≤字符串长度≤100000

// 输入描述
// 一个只包括 ‘(‘，’)’，'{‘，’}’，'[‘，’]’的字符串

// 输出描述
// 一个整数，最大的括号深度
/**
 * 计算括号的最大嵌套深度
 * @param {string} s - 输入的括号字符串
 * @return {number} - 最大嵌套深度
 */
function maxBracketDepth(s) {
    const stack = [];
    let maxDepth = 0;
    let currentDepth = 0;

    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
            currentDepth++;
            maxDepth = Math.max(maxDepth, currentDepth);
        } else {
            if (stack.length === 0) {
                return 0; // 无效字符串
            }
            const lastOpen = stack.pop();
            if ((char === ')' && lastOpen !== '(') ||
                (char === '}' && lastOpen !== '{') ||
                (char === ']' && lastOpen !== '[')) {
                return 0; // 无效字符串
            }
            currentDepth--;
        }
    }

    return stack.length === 0 ? maxDepth : 0; // 如果栈不为空，说明有未闭合的括号
}

// me practise
function a(s) {
for(let i of s) {
    let currentDepth = 0;
    let stack = []
    if(i === '(' || i === '{' || i === '[') {
        stack.push(i);
        currentDepth ++;
        maxDepth = Math.max(maxDepth, currentDepth)
    } else {
        if(stack.length === 0) {
            return 0;
        }
        let lastOen = stack.pop()
        if(i = '}' && lastOen! == "{" || ) {
            return 0
        }
        currentDepth--;
    }
}
 return stack.length === 0 ? maxDepth : 0; // 如果栈不为空，说明有未闭合的括号
}

// 测试用例
function runTests() {
    const testCases = [
        { input: "[]", expected: 1 },
        { input: "([]{()})", expected: 3 },
        { input: "{[]}", expected: 2 },
        { input: "(()", expected: 0 },
        { input: "()))", expected: 0 },
        { input: "", expected: 0 },
        { input: "([)]", expected: 0 },
        { input: "{{{}}}", expected: 3 },
        { input: "((())(()))", expected: 3 },
        { input: "[({()}[])]", expected: 4 }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`Input: "${testCase.input}"`);
        const result = maxBracketDepth(testCase.input);
        console.log(`Output: ${result}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Result: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// 运行测试
runTests();
