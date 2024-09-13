// 题目描述
// "吃货"和"馋嘴"两人到披萨店点了一份铁盘（圆形）披萨，并嘱咐店员将披萨按放射状切成大小相同的偶数个小块。但是粗心的服务员将披萨切成了每块大小都完全不同奇数块，且肉眼能分辨出大小。

// 由于两人都想吃到最多的披萨，他们商量了一个他们认为公平的分法：从"吃货"开始，轮流取披萨。除了第一块披萨可以任意选取外，其他都必须从缺口开始选。

// 他俩选披萨的思路不同。"馋嘴"每次都会选最大块的披萨，而且"吃货"知道"馋嘴"的想法。

// 已知披萨小块的数量以及每块的大小，求"吃货"能分得的最大的披萨大小的总和。

// 输入描述
// 第 1 行为一个正整数奇数 N，表示披萨小块数量。

// 3 ≤ N < 500
// 接下来的第 2 行到第 N + 1 行（共 N 行），每行为一个正整数，表示第 i 块披萨的大小

// 1 ≤ i ≤ N
// 披萨小块从某一块开始，按照一个方向次序顺序编号为 1 ~ N

// 每块披萨的大小范围为 [1, 2147483647]
// 输出描述
// "吃货"能分得到的最大的披萨大小的总和。
function maxPizzaSum(N, pizzaSizes) {
    // 创建一个二维数组来存储动态规划的结果
    const dp = Array(N).fill().map(() => Array(N).fill(0));

    // 初始化单个披萨的情况
    for (let i = 0; i < N; i++) {
        dp[i][i] = pizzaSizes[i];
    }

    // 填充dp数组·
    for (let len = 2; len <= N; len++) {
        for (let i = 0; i < N; i++) {
            let j = (i + len - 1) % N;
            let left = pizzaSizes[i] + Math.min(dp[(i + 2) % N][j], dp[(i + 1) % N][(j - 1 + N) % N]);
            let right = pizzaSizes[j] + Math.min(dp[i][(j - 2 + N) % N], dp[(i + 1) % N][(j - 1 + N) % N]);
            dp[i][j] = Math.max(left, right);
            console.log("i,j", i, j )
            console.log(dp)

        }
    }
    console.log('dp', dp)

    // 找出"吃货"能获得的最大总和
    let maxSum = 0;
    for (let i = 0; i < N; i++) {
        maxSum = Math.max(maxSum, dp[i][(i - 1 + N) % N]);
    }

    return maxSum;
}

// 测试函数
function runTests() {
    const testCases = [
        {
            input: [5, [3, 2, 1, 4, 5]],
            expected: 8
        },
        // {
        //     input: [3, [1, 2, 3]],
        //     expected: 4
        // }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`Input: N = ${testCase.input[0]}, pizzaSizes = [${testCase.input[1]}]`);
        const result = maxPizzaSum(testCase.input[0], testCase.input[1]);
        console.log(`Output: ${result}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Result: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// 运行测试
runTests();
