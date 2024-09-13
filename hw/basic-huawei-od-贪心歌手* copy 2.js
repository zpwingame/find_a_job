// 题目描述
// 一个歌手准备从A城去B城参加演出。

// 按照合同，他必须在 T 天内赶到
// 歌手途经 N 座城市
// 歌手不能往回走
// 每两座城市之间需要的天数都可以提前获知。
// 歌手在每座城市都可以在路边卖唱赚钱。

// 经过调研，歌手提前获知了每座城市卖唱的收入预期：
// 如果在一座城市第一天卖唱可以赚M，后续每天的收入会减少D（第二天赚的钱是 M - D，第三天是 M - 2D ...）。如果收入减少到 0 就不会再少了。
// 歌手到达后的第二天才能开始卖唱。如果今天卖过唱，第二天才能出发。
// 贪心的歌手最多可以赚多少钱？

// 输入描述
// 第一行两个数字 T 和 N，中间用空格隔开。

// T 代表总天数，0 < T < 1000
// N 代表路上经过 N 座城市，0 < N < 100
// 第二行 N+1 个数字，中间用空格隔开。代表每两座城市之间耗费的时间。

// 其总和 ≤ T。
// 接下来 N 行，每行两个数字 M 和 D，中间用空格隔开。代表每个城市的输入预期。

// 0 < M < 1000
// 0 < D < 100
// 输出描述
// 输出一个整数，代表歌手最多可以赚到的钱。
/**
 * 计算歌手最多可以赚到的钱
 * @param {number} T - 总天数
 * @param {number} N - 经过的城市数
 * @param {number[]} travelTimes - 每两座城市之间耗费的时间
 * @param {number[][]} cityIncomes - 每个城市的收入预期 [M, D]
 * @return {number} - 歌手最多可以赚到的钱
 */
function maxEarnings(T, N, travelTimes, cityIncomes) {
    // 动态规划数组，dp[i][j] 表示第 i 天到达第 j 个城市时的最大收益
    const dp = Array(T + 1).fill().map(() => Array(N + 1).fill(-Infinity));
    
    dp[0][0] = 0;  // 初始状态

    for (let day = 1; day <= T; day++) {
        for (let city = 0; city <= N; city++) {
            // 选择不在当前城市停留，继续前进
            if (city > 0 && day >= travelTimes[city - 1]) {
                dp[day][city] = Math.max(dp[day][city], dp[day - travelTimes[city - 1]][city - 1]);
            }

            // 选择在当前城市停留并卖唱
            if (city < N && day > 1) {
                const [M, D] = cityIncomes[city];
                let income = Math.max(0, M - (day - 2) * D);  // 计算当天的收入
                dp[day][city] = Math.max(dp[day][city], dp[day - 1][city] + income);
            }
        }
    }

    // 返回最后一天到达最后一个城市的最大收益
    return Math.max(...dp[T]);
}
// 测试用例
function runTests() {
    const testCases = [
        {
            T: 10,
            N: 2,
            travelTimes: [1, 1],
            cityIncomes: [[100, 20], [200, 40]],
            expected: 700
        },
        {
            T: 5,
            N: 3,
            travelTimes: [1, 1, 1],
            cityIncomes: [[100, 30], [150, 40], [200, 50]],
            expected: 350
        },
        {
            T: 15,
            N: 4,
            travelTimes: [2, 3, 2, 1],
            cityIncomes: [[300, 50], [400, 60], [500, 70], [200, 40]],
            expected: 1600
        }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`Input: T = ${testCase.T}, N = ${testCase.N}`);
        console.log(`Travel Times: [${testCase.travelTimes.join(', ')}]`);
        console.log(`City Incomes: [${testCase.cityIncomes.map(([M, D]) => `[${M}, ${D}]`).join(', ')}]`);
        const result = maxEarnings(testCase.T, testCase.N, testCase.travelTimes, testCase.cityIncomes);
        console.log(`Output: ${result}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Result: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// 运行测试
runTests();

