// 题目描述
// 现有若干个会议，所有会议共享一个会议室，用数组表示各个会议的开始时间和结束时间，格式为：

// [[会议1开始时间, 会议1结束时间], [会议2开始时间, 会议2结束时间]]

// 请计算会议室占用时间段。

// 输入描述
// 第一行输入一个整数 n，表示会议数量

// 之后输入n行，每行两个整数，以空格分隔，分别表示会议开始时间，会议结束时间

// 输出描述
// 输出多行，每个两个整数，以空格分隔，分别表示会议室占用时间段开始和结束

// 备注
// 会议室个数范围：[1, 100]
// 会议室时间段：[1, 24]
/**
 * 计算会议室占用时间段
 * @param {number[][]} meetings - 会议时间数组
 * @returns {number[][]} - 会议室占用时间段
 */
function calculateOccupiedTime(meetings) {
    // 按开始时间排序
    meetings.sort((a, b) => a[0] - b[0]);
    
    const occupiedTimes = [];
    let currentStart = meetings[0][0];
    let currentEnd = meetings[0][1];

    for (let i = 1; i < meetings.length; i++) {
        if (meetings[i][0] <= currentEnd) {
            // 如果当前会议与前一个会议重叠，更新结束时间
            currentEnd = Math.max(currentEnd, meetings[i][1]);
        } else {
            // 如果不重叠，添加前一个时间段并开始新的时间段
            occupiedTimes.push([currentStart, currentEnd]);
            currentStart = meetings[i][0];
            currentEnd = meetings[i][1];
        }
    }
    
    // 添加最后一个时间段
    occupiedTimes.push([currentStart, currentEnd]);

    return occupiedTimes;
}


// 测试用例
function runTestCases() {
    const testCases = [
        {
            input: [[1, 3], [2, 4], [5, 7], [6, 8]],
            expected: [[1, 4], [5, 8]]
        },
        {
            input: [[1, 2], [3, 4], [5, 6], [7, 8]],
            expected: [[1, 2], [3, 4], [5, 6], [7, 8]]
        },
        {
            input: [[1, 5], [2, 3], [4, 6], [7, 8]],
            expected: [[1, 6], [7, 8]]
        }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log('Input:', testCase.input);
        const result = calculateOccupiedTime(testCase.input);
        console.log('Output:', result);
        console.log('Expected:', testCase.expected);
        console.log('Passed:', JSON.stringify(result) === JSON.stringify(testCase.expected));
        console.log('---');
    });
}

// 运行测试用例
runTestCases();

