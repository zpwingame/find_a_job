// 题目描述
// 橱窗里有一排宝石，不同的宝石对应不同的价格，宝石的价格标记为 gems[i]

// 0 ≤ i < n
// n = gems.length
// 宝石可同时出售0个或多个，如果同时出售多个，则要求出售的宝石编号连续；

// 例如客户最大购买宝石个数为m，购买的宝石编号必须为：gems[i]，gems[i+1]，...，gems[i+m-1]

// 0 ≤ i < n
// m ≤ n
// 假设你当前拥有总面值为 value 的钱，请问最多能购买到多少个宝石，如无法购买宝石，则返回0。

// 输入描述
// 第一行输入n，参数类型为int，取值范围：[0,10^6]，表示橱窗中宝石的总数量。

// 之后 n 行分别表示从第0个到第n-1个宝石的价格，即 gems[0] 到 gems[n-1] 的价格，类型为int，取值范围：(0,1000]。

// 之后一行输入v，类型为int，取值范围：[0,10^9]，表示你拥有的钱。

// 输出描述
// 输出int类型的返回值，表示最大可购买的宝石数量。
/**
 * 计算最多可以购买的宝石数量
 * @param {number[]} gems - 宝石价格数组
 * @param {number} value - 拥有的钱
 * @return {number} - 最多可以购买的宝石数量
 */
function maxGemsPurchase(gems, value) {
    let maxCount = 0;
    let n = gems.length;

    for (let i = 0; i < n; i++) {
        let sum = 0;
        let count = 0;
        for (let j = i; j < n; j++) {
            if (sum + gems[j] <= value) {
                sum += gems[j];
                count++;
            } else {
                break;
            }
        }
        maxCount = Math.max(maxCount, count);
    }

    return maxCount;
}
/**
 * 计算最多可以购买的宝石数量（滑动窗口解法）
 * @param {number[]} gems - 宝石价格数组
 * @param {number} value - 拥有的钱
 * @return {number} - 最多可以购买的宝石数量
 */
function maxGemsPurchaseSliding(gems, value) {
    let left = 0;
    let right = 0;
    let currentSum = 0;
    let maxCount = 0;

    while (right < gems.length) {
        currentSum += gems[right];

        while (currentSum > value && left <= right) {
            currentSum -= gems[left];
            left++;
        }

        maxCount = Math.max(maxCount, right - left + 1);
        right++;
    }

    return maxCount;
}
// 解释滑动窗口解法
/**
 * 滑动窗口解法的工作原理：
 * 1. 使用两个指针 left 和 right，初始都指向数组开始。
 * 2. right 指针向右移动，将遇到的宝石价格加入当前总和 currentSum。
 * 3. 如果 currentSum 超过了拥有的钱 value，则移动 left 指针，
 *    从总和中减去左边的宝石价格，直到总和不超过 value。
 * 4. 在每次迭代中，更新最大购买数量 maxCount。
 * 5. 继续移动 right 指针，重复步骤 2-4，直到遍历完整个数组。
 * 
 * 优势：
 * - 时间复杂度为 O(n)，比原始方法的 O(n^2) 更高效。
 * - 空间复杂度为 O(1)，只使用了常数级额外空间。
 * - 对于大规模输入数据，性能表现更好。
 * 
 * 注意：
 * - 这种方法假设所有宝石价格都是正数。
 * - 如果存在价格为 0 或负数的宝石，可能需要调整算法。
 */

// 性能比较函数
function comparePerformance(gems, value) {
    console.time('Original approach');
    const originalResult = maxGemsPurchase(gems, value);
    console.timeEnd('Original approach');

    console.time('Sliding window approach');
    const slidingResult = maxGemsPurchaseSliding(gems, value);
    console.timeEnd('Sliding window approach');

    console.log(`Original result: ${originalResult}`);
    console.log(`Sliding window result: ${slidingResult}`);
}

// 添加大规模测试用例
const largeTestCase = {
    gems: Array.from({length: 10000}, () => Math.floor(Math.random() * 100) + 1),
    value: 50000,
    expected: null  // 期望值在这里不重要，主要是测试性能
};

// 在测试函数中添加性能比较
function runTests() {
    // ... (保留原有的测试用例代码)

    console.log("\nPerformance comparison for large input:");
    comparePerformance(largeTestCase.gems, largeTestCase.value);
}


// 比较两种解法
function compareApproaches(gems, value) {
    console.log("Original approach result:", maxGemsPurchase(gems, value));
    console.log("Sliding window approach result:", maxGemsPurchaseSliding(gems, value));
}

// 添加新的测试用例
const additionalTestCases = [
    {
        gems: [1, 1, 1, 1, 10],
        value: 4,
        expected: 4
    },
    {
        gems: [2, 3, 1, 5, 4],
        value: 6,
        expected: 3
    }
];

// 将新的测试用例添加到原有的测试函数中
testCases.push(...additionalTestCases);


// 测试用例
function runTests() {
    const testCases = [
        {
            gems: [3, 1, 4, 2, 5],
            value: 8,
            expected: 3
        },
        {
            gems: [10, 20, 30, 40, 50],
            value: 100,
            expected: 3
        },
        {
            gems: [1, 2, 3, 4, 5],
            value: 3,
            expected: 2
        },
        {
            gems: [5, 4, 3, 2, 1],
            value: 10,
            expected: 3
        }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`Input: gems = [${testCase.gems.join(', ')}], value = ${testCase.value}`);
        const result = maxGemsPurchase(testCase.gems, testCase.value);
        console.log(`Output: ${result}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Result: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// 运行测试
runTests();
