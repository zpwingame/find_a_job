// 题目描述
// 给定一个数组，里面有 6 个整数，求这个数组能够表示的最大 24 进制的时间是多少，输出这个时间，无法表示输出 invalid。

// 输入描述
// 输入为一个整数数组，数组内有六个整数。

// 输入整数数组长度为 6，不需要考虑其它长度，元素值为 0 或者正整数，6 个数字每个数字只能使用一次。

// 输出描述
// 输出为一个 24 进制格式的时间，或者字符串”invalid“。
/**
 * 计算数组能表示的最大24小时制时间
 * @param {number[]} nums - 包含6个整数的数组
 * @return {string} - 最大时间或 "invalid"
 */
function findMaxTime(nums) {
    // 生成所有可能的排列
    const permutations = generatePermutations(nums);
    let maxTime = -1;

    for (const perm of permutations) {
        const hour = perm[0] * 10 + perm[1];
        const minute = perm[2] * 10 + perm[3];
        const second = perm[4] * 10 + perm[5];

        if (hour < 24 && minute < 60 && second < 60) {
            const time = hour * 3600 + minute * 60 + second;
            if (time > maxTime) {
                maxTime = time;
            }
        }
    }

    if (maxTime === -1) {
        return "invalid";
    }

    // 将最大时间转换为 HH:MM:SS 格式
    const hours = Math.floor(maxTime / 3600);
    const minutes = Math.floor((maxTime % 3600) / 60);
    const seconds = maxTime % 60;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

/**
 * 生成数组的所有排列
 * @param {number[]} nums - 输入数组
 * @return {number[][]} - 所有可能的排列
 */
function generatePermutations(nums) {
    const result = [];

    function backtrack(current, remaining) {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }

        for (let i = 0; i < remaining.length; i++) {
            current.push(remaining[i]);
            backtrack(current, [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
            current.pop();
        }
    }

    backtrack([], nums);
    return result;
}

/**
 * 将数字转换为两位数的字符串
 * @param {number} num - 输入数字
 * @return {string} - 两位数的字符串
 */
function padZero(num) {
    return num.toString().padStart(2, '0');
}

// 测试用例
function runTests() {
    const testCases = [
        { input: [1, 2, 3, 4, 5, 6], expected: "23:56:41" },
        { input: [0, 0, 0, 0, 0, 0], expected: "00:00:00" },
        { input: [2, 3, 4, 5, 6, 7], expected: "23:57:46" },
        { input: [2, 4, 6, 8, 10, 12], expected: "invalid" },
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`Input: [${testCase.input.join(', ')}]`);
        const result = findMaxTime(testCase.input);
        console.log(`Output: ${result}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Result: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// 运行测试
runTests();
