// 题目描述
// 在一颗树中，每个节点代表一个家庭成员，节点的数字表示其个人的财富值，一个节点及其直接相连的子节点被定义为一个小家庭。

// 现给你一颗树，请计算出最富裕的小家庭的财富和。

// 输入描述
// 第一行为一个数 N，表示成员总数，成员编号 1~N。1 ≤ N ≤ 1000

// 第二行为 N 个空格分隔的数，表示编号 1~N 的成员的财富值。0 ≤ 财富值 ≤ 1000000

// 接下来 N -1 行，每行两个空格分隔的整数（N1, N2），表示 N1 是 N2 的父节点。

// 输出描述
// 最富裕的小家庭的财富和

/**
 * 计算最富裕的小家庭的财富和
 * @param {number} N - 成员总数
 * @param {number[]} wealth - 每个成员的财富值
 * @param {[number, number][]} relations - 父子关系
 * @return {number} - 最富裕的小家庭的财富和
 */
function findRichestFamily(N, wealth, relations) {
    // 创建邻接表表示树结构
    const tree = Array.from({ length: N + 1 }, () => []);
    for (const [parent, child] of relations) {
        tree[parent].push(child);
    }

    let maxWealth = 0;

    // 深度优先搜索计算每个小家庭的财富和
    function dfs(node) {
        let familyWealth = wealth[node - 1]; // 当前节点的财富
        for (const child of tree[node]) {
            familyWealth += wealth[child - 1]; // 加上直接子节点的财富
        }
        maxWealth = Math.max(maxWealth, familyWealth);

        // 继续搜索子节点
        for (const child of tree[node]) {
            dfs(child);
        }
    }

    // 从根节点开始搜索
    dfs(1);

    return maxWealth;
}

// 测试函数
function runTests() {
    const testCases = [
        {
            N: 5,
            wealth: [1, 2, 3, 4, 5],
            relations: [[1, 2], [1, 3], [2, 4], [2, 5]],
            expected: 10
        },
        {
            N: 6,
            wealth: [1, 2, 3, 4, 5, 6],
            relations: [[1, 2], [1, 3], [2, 4], [2, 5], [3, 6]],
            expected: 12
        }
    ];

    testCases.forEach((testCase, index) => {
        console.log(`Test Case ${index + 1}:`);
        console.log(`N: ${testCase.N}`);
        console.log(`Wealth: [${testCase.wealth.join(', ')}]`);
        console.log(`Relations: ${JSON.stringify(testCase.relations)}`);
        const result = findRichestFamily(testCase.N, testCase.wealth, testCase.relations);
        console.log(`Output: ${result}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Result: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
        console.log('---');
    });
}

// 运行测试
runTests();
