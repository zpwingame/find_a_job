// 题目描述
// 现代计算机系统中通常存在多级的存储设备，针对海量 workload 的优化的一种思路是将热点内存页优先放到快速存储层级，这就需要对内存页进行冷热标记。

// 一种典型的方案是基于内存页的访问频次进行标记，如果统计窗口内访问次数大于等于设定阈值，则认为是热内存页，否则是冷内存页。

// 对于统计窗口内跟踪到的访存序列和阈值，现在需要实现基于频次的冷热标记。内存页使用页框号作为标识。

// 输入描述
// 第一行输入为 N，表示访存序列的记录条数，0 < N ≤ 10000。

// 第二行为访存序列，空格分隔的 N 个内存页框号，页面号范围 0 ~ 65535，同一个页框号可能重复出现，出现的次数即为对应框号的频次。

// 第三行为热内存的频次阈值 T，正整数范围 1 ≤ T ≤ 10000。

// 输出描述
// 第一行输出标记为热内存的内存页个数，如果没有被标记的热内存页，则输出 0 。

// 如果第一行 > 0，则接下来按照访问频次降序输出内存页框号，一行一个，频次一样的页框号，页框号小的排前面。
/**
 * 内存冷热标记
 * @param {number} N - 访存序列的记录条数
 * @param {number[]} sequence - 访存序列
 * @param {number} T - 热内存的频次阈值
 * @returns {number[]} - 热内存页框号列表
 */
function memoryHotColdMarking(N, sequence, T) {
    // 统计每个页框号的访问频次
    const frequencyMap = new Map();
    for (const pageFrame of sequence) {
        frequencyMap.set(pageFrame, (frequencyMap.get(pageFrame) || 0) + 1);
    }

    // 筛选出热内存页并排序
    const hotPages = Array.from(frequencyMap.entries())
        .filter(([_, frequency]) => frequency >= T)
        .sort((a, b) => b[1] - a[1] || a[0] - b[0])
        .map(([pageFrame, _]) => pageFrame);

    return hotPages;
}

// 测试用例
function runTests() {
    const testCases = [
        {
            N: 10,
            sequence: [1, 2, 3, 4, 5, 2, 3, 4, 5, 1],
            T: 3,
            expected: [2, 3, 4, 5]
        },
        {
            N: 5,
            sequence: [1, 2, 3, 4, 5],
            T: 2,
            expected: []
        },
        {
            N: 8,
            sequence: [1, 1, 2, 2, 3, 3, 4, 5],
            T: 2,
            expected: [1, 2, 3]
        },
        {
            N: 15,
            sequence: [1, 2, 3, 1, 2, 3, 1, 2, 3, 4, 5, 6, 4, 5, 6],
            T: 3,
            expected: [1, 2, 3]
        }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`Input: N = ${testCase.N}, sequence = [${testCase.sequence.join(', ')}], T = ${testCase.T}`);
        const result = memoryHotColdMarking(testCase.N, testCase.sequence, testCase.T);
        console.log(`Output: [${result.join(', ')}]`);
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        console.log(`Result: ${JSON.stringify(result) === JSON.stringify(testCase.expected) ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// 运行测试
runTests();

